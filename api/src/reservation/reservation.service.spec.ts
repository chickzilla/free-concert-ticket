import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { Reservation } from '../entities';
import { Repository } from 'typeorm';
import { ConcertService } from '../concert/concert.service';
import { ReservationAction } from '../const';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
}));

const concertServiceMock = {
  findOne: jest.fn(),
  updateTotalOfReservation: jest.fn(),
};

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
        {
          provide: ConcertService,
          useValue: concertServiceMock,
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

  describe('reserve()', () => {
    it('should reserve successfully if no existing reservation', async () => {
      const mockConcert = {
        id: 'concert1',
        total_of_seat: 100,
        total_of_reservation: 10,
      };

      const mockReservation = {
        id: 'res1',
        concertId: 'concert1',
        userId: 'user1',
        action: ReservationAction.RESERVE,
      };

      concertServiceMock.findOne.mockResolvedValue(mockConcert);
      concertServiceMock.updateTotalOfReservation.mockResolvedValue(undefined);
      repositoryMock.findOne!.mockResolvedValue(null);
      repositoryMock.create!.mockReturnValue(mockReservation);
      repositoryMock.save!.mockResolvedValue(mockReservation);

      const result = await service.reserve({
        concert_id: 'concert1',
        user_id: 'user1',
      });

      expect(result).toEqual(mockReservation);
      expect(repositoryMock.create).toHaveBeenCalledWith({
        concertId: 'concert1',
        userId: 'user1',
        action: ReservationAction.RESERVE,
      });
      expect(concertServiceMock.updateTotalOfReservation).toHaveBeenCalledWith(
        'concert1',
        11,
      );
    });
  });

  describe('cancel()', () => {
    it('should cancel a reservation if the latest action is RESERVE', async () => {
      const mockConcert = {
        id: 'concert1',
        total_of_seat: 100,
        total_of_reservation: 10,
      };

      const latestReservation = {
        id: 'res1',
        concertId: 'concert1',
        userId: 'user1',
        action: ReservationAction.RESERVE,
        created_at: new Date(),
      };

      const updatedReservation = {
        ...latestReservation,
        action: ReservationAction.CANCEL,
      };

      concertServiceMock.findOne.mockResolvedValue(mockConcert);
      concertServiceMock.updateTotalOfReservation.mockResolvedValue(undefined);
      repositoryMock.findOne!.mockResolvedValue(latestReservation);
      repositoryMock.save!.mockResolvedValue(updatedReservation);

      const result = await service.cancel({
        concert_id: 'concert1',
        user_id: 'user1',
      });

      expect(result).toEqual(updatedReservation);
      expect(concertServiceMock.updateTotalOfReservation).toHaveBeenCalledWith(
        'concert1',
        9,
      );
    });
  });

  describe('viewHistoryByUserId()', () => {
    it('should return reservation history for a specific user', async () => {
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

      const result = await service.viewHistoryByUserId('user1');

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
        where: { userId: 'user1' },
        relations: ['user', 'concert'],
        order: { created_at: 'DESC' },
      });
    });
  });

  describe('countAction()', () => {
    it('should return correct counts for RESERVE and CANCEL actions', async () => {
      repositoryMock.count = jest
        .fn()
        .mockImplementation(({ where: { action } }) =>
          action === ReservationAction.RESERVE ? 5 : 3,
        );

      const result = await service.countAction();

      expect(result).toEqual({
        reserveCount: 5,
        cancelCount: 3,
      });

      expect(repositoryMock.count).toHaveBeenCalledWith({
        where: { action: ReservationAction.RESERVE },
      });
      expect(repositoryMock.count).toHaveBeenCalledWith({
        where: { action: ReservationAction.CANCEL },
      });
    });
  });
});
