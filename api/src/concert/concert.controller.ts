import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateConcertDto } from './dto';
import { Concert } from 'src/entities';
import { ConcertService } from './concert.service';
import { TotalOfSeatResponse } from './dto/total-of-seats.dto';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post('/create')
  async create(@Body() createConcertDto: CreateConcertDto): Promise<Concert> {
    try {
      return await this.concertService.create(createConcertDto);
    } catch (error) {
      console.error('Error creating concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/delete/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      await this.concertService.delete(id);
    } catch (error) {
      console.error('Error deleting concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/findAll')
  async findAll(): Promise<Concert[]> {
    try {
      return await this.concertService.findAll();
    } catch (error) {
      console.error('Error fetching concerts:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/totalOfSeat')
  async totalOfSeat(): Promise<TotalOfSeatResponse> {
    try {
      return await this.concertService.totalOfSeat();
    } catch (error) {
      console.error('Error fetching total of seats:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/findAllWithReservationStatus/:uid')
  async findAllWithReservationStatus(
    @Param('uid', new ParseUUIDPipe()) uid: string,
  ): Promise<Concert[]> {
    try {
      return await this.concertService.findAllWithReservationStatus(uid);
    } catch (error) {
      console.error('Error fetching concerts with reservation status:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
