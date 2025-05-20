import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { viewHistoriesResponseItem } from './dto/histories.dto';
import { CancelDTO, countActionResponse, ReserveDTO } from './dto/reserve.dto';
import { Reservation } from 'src/entities';
import { RolesGuard } from 'src/guard';
import { Roles } from 'src/decorator';
import { UserRole } from 'src/const';

@Controller('reservation')
@UseGuards(RolesGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get('/viewHistories')
  @Roles(UserRole.ADMIN)
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

  @Get('/viewHistories/:uid')
  async viewHistoriesByUserId(
    @Param('uid', new ParseUUIDPipe()) uid: string,
  ): Promise<viewHistoriesResponseItem[]> {
    try {
      return await this.reservationService.viewHistoryByUserId(uid);
    } catch (error) {
      console.error('Error fetching histories by user ID:', error);
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

  @Get('/countAction')
  @Roles(UserRole.ADMIN)
  async countAction(): Promise<countActionResponse> {
    try {
      return await this.reservationService.countAction();
    } catch (error) {
      console.error('Error counting actions:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
