import { Module } from '@nestjs/common';
import { ConcertController } from './concert.controller';
import { ConcertService } from './concert.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concert } from 'src/entities/concert.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Concert]),
    ],
    controllers: [ConcertController],
    providers: [ConcertService],
    exports: [ConcertService],
})
export class ConcertModule {}
