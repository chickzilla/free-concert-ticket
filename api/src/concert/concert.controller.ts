import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CreateConcertDto } from './dto';
import { Concert } from 'src/entities';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Post('/create')
  async create(@Body() createConcertDto: CreateConcertDto): Promise<Concert> {
    return this.concertService.create(createConcertDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.concertService.delete(id);
  }
}
