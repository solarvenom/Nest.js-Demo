import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: 'Invisible Sun' })
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 7 })
    junePlays: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 77 })
    julyPlays: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 777 })
    augustPlays: number;
}