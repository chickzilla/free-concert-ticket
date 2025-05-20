import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { viewHistoriesResponseItem } from './dto/histories.dto';
import { CancelDTO, countActionResponse, ReserveDTO } from './dto/reserve.dto';
import { Reservation } from 'src/entities';
import { AuthGuard, RolesGuard } from 'src/guard';
import { Roles } from 'src/decorator';
import { UserRole } from 'src/const';
import { RequestWithUser } from 'src/types/requestWithUser.type';

@Controller('reservation')
@UseGuards(AuthGuard)
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

  @Get('/viewHistoriesByUserId')
  async viewHistoriesByUserId(
    @Request() req: RequestWithUser,
  ): Promise<viewHistoriesResponseItem[]> {
    try {
      return await this.reservationService.viewHistoryByUserId(req?.user_id);
    } catch (error) {
      console.error('Error fetching histories by user ID:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/reserve')
  async reserve(
    @Body() reserveDTO: ReserveDTO,
    @Request() req: RequestWithUser,
  ): Promise<Reservation> {
    try {
      return await this.reservationService.reserve(
        reserveDTO.concert_id,
        req?.user_id,
      );
    } catch (error) {
      console.error('Error reserving concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/cancel')
  async cancel(
    @Body() cancelDTO: CancelDTO,
    @Request() req: RequestWithUser,
  ): Promise<Reservation> {
    try {
      return await this.reservationService.cancel(
        cancelDTO.concert_id,
        req?.user_id,
      );
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
