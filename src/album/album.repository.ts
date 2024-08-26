import { Injectable } from "@nestjs/common";
import { Repository, DataSource } from 'typeorm';
import { AlbumEntity } from "./entities/album.entity";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { ListAlbumDto } from "./dtos/list.album.dto";
import { SearchAlbumDto } from "./dtos/search.album.dto";

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private dataSource: DataSource) {
    super(AlbumEntity, dataSource.createEntityManager());
  }

  async list(sortBy: SortOptionsEnum, order: SortDirectionEnum): Promise<ListAlbumDto[]> {
    return this.createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'song')
      .loadRelationCountAndMap('album.songCount', 'album.songs')
      .select(['album.title as title', 'album.year as year', 'album.uuid as uuid'])
      .addSelect('COUNT(song.id)', 'songCount')
      .groupBy('album.id')
      .orderBy(`album.${sortBy}`, order)
      .getRawMany<ListAlbumDto>();      
  }

  async getAlbumDetailsByUUID(uuid: string): Promise<any> {
    return this.createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'song')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('song.writers', 'writer')
      .where('album.uuid = :uuid', { uuid })
      .getOne();
  }

  async fullTextSearch(searchTerm: string): Promise<SearchAlbumDto[]> {
    return this.createQueryBuilder('album')
        .select([
          'album.title as title', 
          'album.uuid as uuid'])
        .where('album.title ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
        .getRawMany<SearchAlbumDto>();
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}