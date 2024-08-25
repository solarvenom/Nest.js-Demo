import { MaxLength, IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ListAlbumDto } from './list.album.dto';
import { CreateArtistDto } from '../../dtos/artist/create.artist.dto';
import { CreateWriterDto } from '../../dtos/writer/create.writer.dto';
import { CreateSongDto } from '../../dtos/song/create.song.dto';

export class InspectAlbumDto extends ListAlbumDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [{ name: 'Keith Flint' }]})
    artists: CreateArtistDto[]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [{ name: 'Keith Flint' }]})
    writers: CreateWriterDto[]

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [
        { 
            title: 'Invisible Sun',
            june: 7,
            july: 77,
            august: 777
        },
        {
            title: 'Wild Frontier',
            june: 8,
            july: 88,
            august: 888
        }
    ]})
    songs: CreateSongDto[]
}