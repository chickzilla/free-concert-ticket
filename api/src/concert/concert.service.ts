import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto';
import { Concert } from '../entities';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepo: Repository<Concert>,
  ) {}

  async create(createDTP: CreateConcertDto): Promise<Concert> {
    try {
      const concert = this.concertRepo.create(createDTP);
      return this.concertRepo.save(concert);
    } catch (error) {
      console.error('Error creating concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const concert = await this.concertRepo.findOneBy({ id });
      if (!concert) {
        throw new BadRequestException('Concert not found');
      }
      await this.concertRepo.delete(id);
    } catch (error) {
      console.error('Error creating concert:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
