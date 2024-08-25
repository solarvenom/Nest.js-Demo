import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { WriterEntity } from "./entities/writer.entity";
import { CreateWriterDto } from "./dtos/create.writer.dto";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { ListWriterDto } from "./dtos/list.writer.dto";

@Injectable()
export class WriterRepository extends Repository<WriterEntity> {
  constructor(private dataSource: DataSource) {
    super(WriterEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<WriterEntity[]> {
    return this.find()
  }

  async findByName(name: string): Promise<WriterEntity> {
    return this.findOne({ where: { name: name }})
  }

  async createWriter(writerDto: CreateWriterDto): Promise<WriterEntity> {
    const writer = this.create(writerDto)
    return this.save(writer)
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

  async isPopulated(): Promise<number> {
    return this.count()
  }
}