import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateWriterDto } from './create.writer.dto';

export class ListWriterDto extends CreateWriterDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2 })
    songs: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1 })
    albums: number;
}