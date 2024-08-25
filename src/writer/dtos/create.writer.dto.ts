import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWriterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ example: 'Keith Flint' })
    name: string;
}