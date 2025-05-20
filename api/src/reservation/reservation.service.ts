import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entities';
import { Repository } from 'typeorm';
import { viewHistoriesResponseItem } from './dto/histories.dto';
import { ReservationAction } from '../const';
import { ConcertService } from '../concert/concert.service';
import { CancelDTO, countActionResponse, ReserveDTO } from './dto/reserve.dto';

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

  async viewHistoryByUserId(
    userId: string,
  ): Promise<viewHistoriesResponseItem[]> {
    const reservations = await this.reservationRepository.find({
      where: { userId },
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

  async reserve(concertId: string, userId: string): Promise<Reservation> {
    const concert = await this.concertService.findOne(concertId);
    if (concert.total_of_reservation >= concert.total_of_seat) {
      throw new BadRequestException(`No available seats.`);
    }

    const latest = await this.reservationRepository.findOne({
      where: { concertId, userId },
      order: { created_at: 'DESC' },
    });

    if (latest?.action === ReservationAction.RESERVE) {
      throw new BadRequestException(`You have already reserved this concert.`);
    }

    const new_total = concert.total_of_reservation + 1;
    await this.concertService.updateTotalOfReservation(concertId, new_total);

    const newReservation = this.reservationRepository.create({
      concertId,
      userId,
      action: ReservationAction.RESERVE,
    });
    return this.reservationRepository.save(newReservation);
  }

  async cancel(concertId: string, userId: string): Promise<Reservation> {
    const concert = await this.concertService.findOne(concertId);

    const latest = await this.reservationRepository.findOne({
      where: { concertId, userId },
      order: { created_at: 'DESC' },
    });

    if (!latest || latest.action !== ReservationAction.RESERVE) {
      throw new BadRequestException(`You have not reserved this concert.`);
    }

    const new_total = concert.total_of_reservation - 1;
    await this.concertService.updateTotalOfReservation(concertId, new_total);

    const cancelReservation = this.reservationRepository.create({
      concertId,
      userId,
      action: ReservationAction.CANCEL,
    });
    return this.reservationRepository.save(cancelReservation);
  }

  async countAction(): Promise<countActionResponse> {
    const reserveCount = await this.reservationRepository.count({
      where: { action: ReservationAction.RESERVE },
    });

    const cancelCount = await this.reservationRepository.count({
      where: { action: ReservationAction.CANCEL },
    });

    return { reserveCount, cancelCount };
  }
}
