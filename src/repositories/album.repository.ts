import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { AlbumEntity } from "../entities/album.entity";
import { CreateAlbumDto } from "../dtos/album/create.album.dto";

@Injectable()
export class AlbumRepository extends Repository<AlbumEntity> {

  async findAll(): Promise<AlbumEntity[]> {
    return this.find()
  }

  async findByTitle(title: string): Promise<AlbumEntity> {
    return this.findOne({ where: { title: title }})
  }

  async findByYear(year: number): Promise<AlbumEntity> {
    return this.findOne({ where: { year: year }})
  }

  async createAlbum(albumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const album = this.create(albumDto)
    return this.save(album)
  }
}