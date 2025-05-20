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
import { LoginDto, LoginResponse } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDto, res: Response): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { username: loginDTO.username },
    });

    if (!user) throw new NotFoundException('User not found');

    const token = await this.jwtService.signAsync(
      { username: user.username, role: user.role },
      { secret: process.env.JWT_SECRET },
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie('role', user.role, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
    return {
      username: user.username,
      role: user.role,
    };
  }
}
