import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { LoginDto } from './dto/login';
import { UserRole } from '../const';

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('should return a jwt token on successful login', async () => {
      const loginDto: LoginDto = { username: 'testuser' };
      repositoryMock.findOne!.mockResolvedValue(mockUser);

      const result = await service.login(loginDto);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
        { username: 'testuser', role: UserRole.USER },
        { secret: process.env.JWT_SECRET },
      );
      expect(result).toEqual({ jwt: mockJwt });
    });
  });
});
