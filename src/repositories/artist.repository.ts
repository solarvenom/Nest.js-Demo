import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { ArtistEntity } from "../entities/artist.entity";
import { CreateArtistDto } from "../dtos/artist/create.artist.dto";

@Injectable()
export class ArtistRepository extends Repository<ArtistEntity> {
  constructor(private dataSource: DataSource) {
    super(ArtistEntity, dataSource.createEntityManager());
  }

  async findAll(): Promise<ArtistEntity[]> {
    return this.find()
  }

  async findByName(name: string): Promise<ArtistEntity> {
    return this.findOne({ where: { name: name }})
  }

  async createArtist(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.create(artistDto)
    return this.save(artist)
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}