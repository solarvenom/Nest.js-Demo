import { MaxLength, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;
}