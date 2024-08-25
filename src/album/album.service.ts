import { Injectable } from '@nestjs/common';
import { ListedAlbumDto } from './dtos/listed.album.dto';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { SortOptionsEnum } from '../enums/sort.options.enum';
import { AlbumRepository } from './album.repository';

@Injectable()
export class AlbumService {
    constructor(
        private readonly albumRepository: AlbumRepository,
      ) {}

    getSortedAlbums(
        sortBy: SortOptionsEnum.TITLE | SortOptionsEnum.YEAR, 
        order: SortDirectionEnum
    ): Promise<ListedAlbumDto[]> {
        return this.albumRepository.list(sortBy, order)
    }
}
