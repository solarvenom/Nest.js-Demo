import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;
}