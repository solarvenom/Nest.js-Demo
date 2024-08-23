import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    june: number;

    @IsNumber()
    @IsNotEmpty()
    july: number;

    @IsNumber()
    @IsNotEmpty()
    august: number;
}