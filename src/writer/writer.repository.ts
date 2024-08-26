import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from 'typeorm';
import { WriterEntity } from "./entities/writer.entity";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { ListWriterDto } from "./dtos/list.writer.dto";
import { SearchWriterDto } from "./dtos/search.writer.dto";

@Injectable()
export class WriterRepository extends Repository<WriterEntity> {
  constructor(private dataSource: DataSource) {
    super(WriterEntity, dataSource.createEntityManager());
  }

  async list(sortBy: SortOptionsEnum, order: SortDirectionEnum): Promise<ListWriterDto[]> {
    return this.createQueryBuilder('writer')
        .leftJoin('writer.songs', 'song')
        .leftJoin('song.album', 'album')
        .select([
            'writer.name as name',
            'COUNT(DISTINCT song.id) as songs',
            'COUNT(DISTINCT album.id) as albums',
        ])
        .groupBy('writer.name')
        .orderBy(
            sortBy === SortOptionsEnum.NAME ? 'writer.name' : 
            sortBy === SortOptionsEnum.SONGS ? SortOptionsEnum.SONGS : SortOptionsEnum.ALBUMS,
            order
        )
        .getRawMany<ListWriterDto>();
  }

  async fullTextSearch(searchTerm: string): Promise<SearchWriterDto[]> {
    return this.createQueryBuilder('writer')
        .select([
          'writer.name as name', 
          'writer.uuid as uuid'])
        .where('to_tsvector(writer.name) @@ plainto_tsquery(:searchTerm)', { searchTerm })
        .getRawMany<SearchWriterDto>();
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}