import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ListArtistDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: 'The Prodigy' })
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 15 })
    junePlays: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 165 })
    julyPlays: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1665 })
    augustPlays: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1845 })
    overallPlays: number;
}