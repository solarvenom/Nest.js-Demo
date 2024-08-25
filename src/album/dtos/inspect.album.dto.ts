import { MaxLength, IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ListAlbumDto } from './list.album.dto';
import { CreateArtistDto } from '../../artist/dtos/create.artist.dto';
import { CreateWriterDto } from '../../dtos/writer/create.writer.dto';
import { CreateSongDto } from '../../dtos/song/create.song.dto';

export class InspectAlbumDto extends ListAlbumDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ example: [{ name: 'The Prodigy' }]})
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
            junePlays: 7,
            julyPlays: 77,
            augustPlays: 777
        },
        {
            title: 'Wild Frontier',
            junePlays: 8,
            julyPlays: 88,
            augustPlays: 888
        }
    ]})
    songs: CreateSongDto[]
}