import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from '../entities';
import { Repository } from 'typeorm';
import { viewHistoriesResponseItem } from './dto/histories.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
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
}
