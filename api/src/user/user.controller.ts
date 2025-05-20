import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, LoginResponse } from './dto/login';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login(@Body() loginDTO: LoginDto): Promise<LoginResponse> {
    try {
      return await this.userService.login(loginDTO);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
