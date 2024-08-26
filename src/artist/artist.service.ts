import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { SortOptionsEnum } from '../enums/sort.options.enum';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { ListArtistDto } from './dtos/list.artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
    constructor(
        private readonly artistRepository: ArtistRepository,
      ) {}

    async getAllArtists(): Promise<ArtistEntity[]>{
        return this.artistRepository.findAll()
    }

    async getSortedArtists(
        sortBy: SortOptionsEnum.NAME | SortOptionsEnum.JUNE_PLAYS | SortOptionsEnum.JULY_PLAYS |
            SortOptionsEnum.AUGUST_PLAYS | SortOptionsEnum.OVERALL_PLAYS, 
        order: SortDirectionEnum
    ): Promise<ListArtistDto[]> {
        return this.artistRepository.list(sortBy, order)
    }
}
