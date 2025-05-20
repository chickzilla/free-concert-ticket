import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities';
import { ConcertModule } from 'src/concert/concert.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), ConcertModule, JwtModule],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
