import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: 'The Prodigy' })
    name: string;
}