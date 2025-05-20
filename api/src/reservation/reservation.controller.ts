import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { viewHistoriesResponseItem } from './dto/histories.dto';

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
}
