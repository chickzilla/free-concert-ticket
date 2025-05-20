import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ReserveDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  concert_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  user_id: string;
}

export class CancelDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  concert_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  user_id: string;
}
