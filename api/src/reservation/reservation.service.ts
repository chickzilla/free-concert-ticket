import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entities';
import { Repository } from 'typeorm';
import { viewHistoriesResponseItem } from './dto/histories.dto';
import { ReservationAction } from '../const';
import { ConcertService } from '../concert/concert.service';
import { ReserveDTO } from './dto/reserve.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly concertService: ConcertService,
  ) {}

  async viewHistory(): Promise<viewHistoriesResponseItem[]> {
    const reservations = await this.reservationRepository.find({
      relations: ['user', 'concert'],
      order: { created_at: 'DESC' },
    });

    return reservations.map((res) => ({
      id: res.id,
      date: res.created_at,
      username: res.user?.username || 'Unknown',
      concert_name: res.concert?.name || 'Unknown',
      action: res.action,
    }));
  }

  async reserve(reserveDTO: ReserveDTO): Promise<Reservation> {
    const { concert_id: concertId, user_id: userId } = reserveDTO;
    const concert = await this.concertService.findOne(concertId);
    if (concert?.total_of_reservation >= concert?.total_of_seat) {
      throw new BadRequestException(`No available seats.`);
    }
    const new_total_of_reservation = concert?.total_of_reservation + 1;

    const latest = await this.reservationRepository.findOne({
      where: { concertId, userId },
      order: { created_at: 'DESC' },
    });

    // If no reservation exists, create a new one
    if (!latest) {
      const newReservation = this.reservationRepository.create({
        concertId,
        userId,
        action: ReservationAction.RESERVE,
      });
      await this.concertService.updateTotalOfReservation(
        concertId,
        new_total_of_reservation,
      );
      return this.reservationRepository.save(newReservation);
    }

    if (latest.action === ReservationAction.RESERVE) {
      throw new BadRequestException(`You have already reserved this concert.`);
    }

    // If the latest action was CANCEL, update it to RESERVE
    latest.action = ReservationAction.RESERVE;
    await this.concertService.updateTotalOfReservation(
      concertId,
      new_total_of_reservation,
    );
    return this.reservationRepository.save(latest);
  }
}
