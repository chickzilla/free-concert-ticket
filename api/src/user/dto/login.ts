import { IsEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserRole } from 'src/const';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class LoginResponse {
  username: string;
  role: UserRole;
}
