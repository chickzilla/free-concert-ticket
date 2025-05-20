import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { Reservation } from '../entities';
import { Repository } from 'typeorm';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
}));

describe('ReservationService', () => {
  let service: ReservationService;
  let repositoryMock: MockType<Repository<Reservation>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repositoryMock = module.get(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('viewHistory()', () => {
    it('should return mapped reservation history data', async () => {
      const mockReservations = [
        {
          id: '1',
          created_at: new Date('2024-09-12T15:00:00.000Z'),
          user: { username: 'Sara John' },
          concert: { name: 'The festival Int 2024' },
          action: 'CANCEL',
        },
        {
          id: '2',
          created_at: new Date('2024-09-12T10:39:20.000Z'),
          user: { username: 'Sara John' },
          concert: { name: 'The festival Int 2024' },
          action: 'RESERVE',
        },
      ];

      repositoryMock.find!.mockResolvedValue(mockReservations);

      const result = await service.viewHistory();

      expect(result).toEqual([
        {
          id: '1',
          date: new Date('2024-09-12T15:00:00.000Z'),
          username: 'Sara John',
          concert_name: 'The festival Int 2024',
          action: 'CANCEL',
        },
        {
          id: '2',
          date: new Date('2024-09-12T10:39:20.000Z'),
          username: 'Sara John',
          concert_name: 'The festival Int 2024',
          action: 'RESERVE',
        },
      ]);

      expect(repositoryMock.find).toHaveBeenCalledWith({
        relations: ['user', 'concert'],
        order: { created_at: 'DESC' },
      });
    });
  });
});
