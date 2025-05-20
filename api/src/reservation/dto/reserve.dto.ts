import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ReserveDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  concert_id: string;
}

export class CancelDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  concert_id: string;
}

export class countActionResponse {
  reserveCount: number;
  cancelCount: number;
}
