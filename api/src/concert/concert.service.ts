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
}
