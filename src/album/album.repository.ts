import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { AlbumEntity } from "./entities/album.entity";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { ListAlbumDto } from "./dtos/list.album.dto";

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {
  constructor(private dataSource: DataSource) {
    super(AlbumEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.find()
  }

  async findByTitle(title: string): Promise<AlbumEntity> {
    return this.findOne({ where: { title: title }})
  }

  async findByYear(year: number): Promise<AlbumEntity> {
    return this.findOne({ where: { year: year }})
  }

  async list(sortBy: SortOptionsEnum, order: SortDirectionEnum): Promise<ListAlbumDto[]> {
    return this.createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'song')
      .loadRelationCountAndMap('album.songCount', 'album.songs')
      .select(['album.title as title', 'album.year as year', 'album.uuid as uuid'])
      .addSelect('COUNT(song.id)', 'songCount')
      .groupBy('album.id')
      .orderBy(`album.${sortBy}`, order)
      .getRawMany();      
  }

  async getAlbumDetailsByUUID(uuid: string): Promise<any> {
    return this.createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'song')
      .leftJoinAndSelect('song.artists', 'artist')
      .leftJoinAndSelect('song.writers', 'writer')
      .where('album.uuid = :uuid', { uuid })
      .getOne();
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}