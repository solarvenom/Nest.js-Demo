import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}