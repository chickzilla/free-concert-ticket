import { IsEmpty, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class LoginResponse {
  jwt: string;
}
