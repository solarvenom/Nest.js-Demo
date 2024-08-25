import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAlbumDto } from './create.album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListedAlbumDto extends CreateAlbumDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 15 })
    songsCount: number;
}