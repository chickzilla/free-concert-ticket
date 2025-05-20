import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { LoginDto } from './dto/login';
import { UserRole } from '../const';
import { Response } from 'express';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let repositoryMock: MockType<Repository<User>>;
  let jwtServiceMock: Partial<JwtService>;

  const mockUser: User = {
    id: 'user1',
    username: 'testuser',
    role: UserRole.USER,
  } as User;

  const mockJwt = 'mock.jwt.token';

  const mockResponse = {
    cookie: jest.fn().mockReturnThis(),
  } as unknown as Response;

  beforeEach(async () => {
    jwtServiceMock = {
      signAsync: jest.fn().mockResolvedValue(mockJwt),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repositoryMock = module.get(getRepositoryToken(User));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('should set JWT and role cookies on successful login', async () => {
      const loginDto: LoginDto = { username: 'testuser' };
      repositoryMock.findOne!.mockResolvedValue(mockUser);

      await service.login(loginDto, mockResponse);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });

      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'token',
        mockJwt,
        expect.any(Object),
      );
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'role',
        UserRole.USER,
        expect.any(Object),
      );
    });
  });
});
