import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    junePlays: number;

    @IsNumber()
    @IsNotEmpty()
    julyPlays: number;

    @IsNumber()
    @IsNotEmpty()
    augustPlays: number;
}