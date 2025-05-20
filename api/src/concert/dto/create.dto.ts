import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateConcertDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description : string;
    
    @IsNotEmpty()
    @IsInt()
    total_of_seat: number;
    
}