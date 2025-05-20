import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Concert } from '../entities/concert.entity';
import { Repository } from 'typeorm';
import { CreateConcertDto } from './dto';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => Promise.resolve({ ...entity, id: 'mock-id' })),
  find: jest.fn(),
}));

describe('ConcertService', () => {
  let service: ConcertService;
  let repositoryMock: MockType<Repository<Concert>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: getRepositoryToken(Concert),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ConcertService>(ConcertService);
    repositoryMock = module.get(getRepositoryToken(Concert));
  });

  describe('create()', () => {
    it('should create a concert', async () => {
      const dto: CreateConcertDto = {
        name: 'Test Concert',
        description: 'Test Description',
        total_of_seat: 100,
      };

      const result = await service.create(dto);

      expect(result).toEqual(
        expect.objectContaining({ id: 'mock-id', ...dto }),
      );
    });
  });

  describe('delete()', () => {
    it('should delete concert', async () => {
      const concertId = 'mock-id';
      const mockConcert = {
        id: concertId,
        name: 'To be deleted',
        description: 'Some concert',
        total_of_seat: 200,
      };

      repositoryMock.findOneBy = jest.fn().mockResolvedValue(mockConcert);
      repositoryMock.delete = jest.fn().mockResolvedValue(undefined);

      await expect(service.delete(concertId)).resolves.toBeUndefined();
      expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id: concertId });
      expect(repositoryMock.delete).toHaveBeenCalledWith(concertId);
    });
  });

  describe('findAll()', () => {
    it('should return all concerts', async () => {
      const mockConcerts = [
        {
          id: '1',
          name: 'Concert 1',
          description: 'Desc 1',
          total_of_reservation: 0,
          total_of_seat: 100,
        },
        {
          id: '2',
          name: 'Concert 2',
          description: 'Desc 2',
          total_of_reservation: 100,
          total_of_seat: 200,
        },
      ];

      repositoryMock.find = jest.fn().mockResolvedValue(mockConcerts);

      const result = await service.findAll();

      expect(result).toEqual(mockConcerts);
      expect(repositoryMock.find).toHaveBeenCalled();
    });
  });

  describe('totalOfSeat()', () => {
    it('should return total of all seats', async () => {
      const mockQueryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ total: '350' }),
      };

      repositoryMock.createQueryBuilder = jest
        .fn()
        .mockReturnValue(mockQueryBuilder);

      const result = await service.totalOfSeat();

      expect(result).toEqual({ total_of_seat: 350 });
      expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith('concert');
    });

    it('should return 0 if total is null', async () => {
      const mockQueryBuilder: any = {
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue({ total: null }),
      };

      repositoryMock.createQueryBuilder = jest
        .fn()
        .mockReturnValue(mockQueryBuilder);

      const result = await service.totalOfSeat();

      expect(result).toEqual({ total_of_seat: 0 });
    });
  });
});
