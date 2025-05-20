import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
