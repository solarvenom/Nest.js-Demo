import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { SongEntity } from "./entities/song.entity";
import { CreateSongDto } from "./dtos/create.song.dto";

@Injectable()
export class SongRepository extends Repository<SongEntity> {
  constructor(private dataSource: DataSource) {
    super(SongEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<SongEntity[]> {
    return this.find()
  }

  async findByName(title: string): Promise<SongEntity> {
    return this.findOne({ where: { title: title }})
  }

  async createSong(songDto: CreateSongDto): Promise<SongEntity> {
    const song = this.create(songDto)
    return this.save(song)
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}