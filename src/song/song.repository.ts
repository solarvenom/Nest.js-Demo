import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from 'typeorm';
import { SongEntity } from "./entities/song.entity";
import { SearchSongDto } from "./dtos/search.song.dto";

@Injectable()
export class SongRepository extends Repository<SongEntity> {
  constructor(private dataSource: DataSource) {
    super(SongEntity, dataSource.createEntityManager());
  }

  async fullTextSearch(searchTerm: string): Promise<SearchSongDto[]> {
    return this.createQueryBuilder('song')
        .select([
          'song.title as title', 
          'song.uuid as uuid'])
        .where('to_tsvector(song.title) @@ plainto_tsquery(:searchTerm)', { searchTerm })
        .getRawMany<SearchSongDto>();
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}