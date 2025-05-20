import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Put,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { viewHistoriesResponseItem } from './dto/histories.dto';
import { CancelDTO, ReserveDTO } from './dto/reserve.dto';
import { Reservation } from 'src/entities';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/viewHistories')
  async viewHistories(): Promise<viewHistoriesResponseItem[]> {
    try {
      return await this.reservationService.viewHistory();
    } catch (error) {
      console.error('Error fetching histories:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/reserve')
  async reserve(@Body() reserveDTO: ReserveDTO): Promise<Reservation> {
    try {
      return await this.reservationService.reserve(reserveDTO);
    } catch (error) {
      console.error('Error reserving concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/cancel')
  async cancel(@Body() cancelDTO: CancelDTO): Promise<Reservation> {
    try {
      return await this.reservationService.cancel(cancelDTO);
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
