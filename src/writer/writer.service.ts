import { Injectable } from '@nestjs/common';
import { WriterRepository } from './writer.repository';
import { SortOptionsEnum } from 'src/enums/sort.options.enum';
import { SortDirectionEnum } from 'src/enums/sort.direction.enum';
import { ListWriterDto } from './dtos/list.writer.dto';

@Injectable()
export class WriterService {
    constructor(
        private readonly writerRepository: WriterRepository,
      ) {}

    async getSortedArtists(
        sortBy:SortOptionsEnum.NAME | SortOptionsEnum.SONGS | SortOptionsEnum.ALBUMS, 
        order: SortDirectionEnum
    ): Promise<ListWriterDto[]> {
        return this.writerRepository.list(sortBy, order)
    }
}
