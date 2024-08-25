import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from './create.artist.dto'

export class ListArtistDto extends CreateArtistDto {
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