import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { CreateAlbumDto } from './create.album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ListAlbumDto extends CreateAlbumDto {
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({ example: 'c1da046e-0ccc-48c8-bdd7-1ffea963eba1' })
    uuid!: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2 })
    songsCount: number;
}