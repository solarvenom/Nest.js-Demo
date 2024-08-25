import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { AlbumEntity } from "./entities/album.entity";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { ListedAlbumDto } from "./dtos/listed.album.dto";

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

  async list(sortBy: SortOptionsEnum, order: SortDirectionEnum): Promise<ListedAlbumDto[]> {
    return this.createQueryBuilder('album')
      .leftJoinAndSelect('album.songs', 'song')
      .loadRelationCountAndMap('album.songCount', 'album.songs')
      .select(['album.title as title', 'album.year as year'])
      .addSelect('COUNT(song.id)', 'songCount')
      .groupBy('album.id')
      .orderBy(`album.${sortBy}`, order)
      .getRawMany();      
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}