import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateWriterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}