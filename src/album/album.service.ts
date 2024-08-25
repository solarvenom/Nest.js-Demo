import { Injectable } from '@nestjs/common';
import { ListAlbumDto } from './dtos/list.album.dto';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { SortOptionsEnum } from '../enums/sort.options.enum';
import { AlbumRepository } from './album.repository';
import { InspectAlbumDto } from './dtos/inspect.album.dto';

@Injectable()
export class AlbumService {
    constructor(
        private readonly albumRepository: AlbumRepository,
      ) {}

    async getSortedAlbums(
        sortBy: SortOptionsEnum.TITLE | SortOptionsEnum.YEAR, 
        order: SortDirectionEnum
    ): Promise<ListAlbumDto[]> {
        return this.albumRepository.list(sortBy, order)
    }

    async getAlbumByUUID(uuid: string): Promise<InspectAlbumDto> {
        const albumDetails = await this.albumRepository.getAlbumDetailsByUUID(uuid)
        const [artists, writers] = [[],[]]

        for(const song of albumDetails.songs){
            for(const artist of song.artists){
                if(!artists.some((e) => e.uuid == artist.uuid)) artists.push({ uuid: artist.uuid, name: artist.name })
            }
            for(const writer of song.writers){
                if(!writers.some((e) => e.uuid == writer.uuid)) writers.push({ uuid: writer.uuid, name: writer.name })
            }
        }

        return {
            uuid: albumDetails.uuid,
            title: albumDetails.title,
            year: albumDetails.year,
            songsCount: albumDetails.songs.length,
            songs: await albumDetails.songs.map((song) => {
                return {
                    uuid: song.uuid,
                    title: song.title,
                    junePlays: song.junePlays,
                    julyPlays: song.julyPlays,
                    augustPlays: song.augustPlays,
                }
            }),
            artists: artists,
            writers: writers
        }
    }
}
