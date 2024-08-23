import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { SongEntity } from "../entities/song.entity";
import { CreateSongDto } from "../dtos/song/create.song.dto";

@Injectable()
export class SongRepository extends Repository<SongEntity> {

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
}