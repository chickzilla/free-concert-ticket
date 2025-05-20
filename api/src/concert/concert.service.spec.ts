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
});
