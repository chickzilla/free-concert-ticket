import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { LoginDto, LoginResponse } from './dto/login';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDto): Promise<LoginResponse> {
    const { username } = loginDTO;
    const user = await this.userRepository.findOne({ where: { username } });

    const token = await this.jwtService.signAsync(
      {
        username: user.username,
        role: user.role,
      },
      { secret: process.env.JWT_SECRET },
    );

    return { jwt: token };
  }
}
