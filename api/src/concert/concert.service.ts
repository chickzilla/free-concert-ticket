import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto';
import { Concert } from '../entities';
import { TotalOfSeatResponse } from './dto/total-of-seats.dto';
import { ReservationAction } from '../const';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
  ) {}

  async create(createDTP: CreateConcertDto): Promise<Concert> {
    const concert = this.concertRepo.create(createDTP);
    return this.concertRepo.save(concert);
  }

  async delete(id: string): Promise<void> {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) {
      throw new BadRequestException('Concert not found');
    }
    await this.concertRepo.delete(id);
  }

  async findAll(): Promise<Concert[]> {
    return this.concertRepo.find();
  }

  async totalOfSeat(): Promise<TotalOfSeatResponse> {
    const result = await this.concertRepo
      .createQueryBuilder('concert')
      .select('SUM(concert.total_of_seat)', 'total')
      .getRawOne();

    return {
      total_of_seat: Number(result.total) || 0,
    };
  }

  async findOne(id: string): Promise<Concert> {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) {
      throw new BadRequestException('Concert not found');
    }
    return concert;
  }

  async updateTotalOfReservation(
    id: string,
    newTotalOfReverse: number,
  ): Promise<void> {
    const concert = await this.concertRepo.findOneBy({ id });
    if (!concert) {
      throw new BadRequestException('Concert not found');
    }
    concert.total_of_reservation = newTotalOfReverse;
    await this.concertRepo.save(concert);
  }

  async findAllWithReservationStatus(
    userId: string,
  ): Promise<(Concert & { isReserve: boolean })[]> {
    const concerts = await this.concertRepo.find();

    const reservations = await this.concertRepo
      .createQueryBuilder('concert')
      .leftJoinAndSelect(
        'concert.reservations',
        'reservation',
        'reservation.userId = :userId',
        {
          userId,
        },
      )
      .getMany();

    const latestMap = new Map<string, ReservationAction>();

    for (const concert of reservations) {
      const latest = concert.reservations
        ?.filter((r) => r.userId === userId)
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())[0];

      if (latest) {
        latestMap.set(concert.id, latest.action);
      }
    }

    return concerts.map((concert) => ({
      ...concert,
      isReserve: latestMap.get(concert.id) === ReservationAction.RESERVE,
    }));
  }
}
