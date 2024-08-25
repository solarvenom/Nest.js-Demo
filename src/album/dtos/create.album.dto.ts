import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiProperty({ example: 'The Day Is My Enemy' })
    title: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2015 })
    year: number;
}