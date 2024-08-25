import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { ArtistEntity } from "./entities/artist.entity";
import { CreateArtistDto } from "./dtos/create.artist.dto";
import { SortOptionsEnum } from "../enums/sort.options.enum";
import { SortDirectionEnum } from "../enums/sort.direction.enum";
import { ListArtistDto } from "./dtos/list.artist.dto";

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


  async list(sortBy: SortOptionsEnum, order: SortDirectionEnum): Promise<ListArtistDto[]> {
    return this.createQueryBuilder('artist')
    .innerJoin('artist.songs', 'song')
    .select([
        'artist.name as name',
        'SUM(song.junePlays) as junePlays',
        'SUM(song.julyPlays) as julyPlays',
        'SUM(song.augustPlays) as augustPlays',
        'SUM(song.junePlays + song.julyPlays + song.augustPlays) as overallPlays'
    ])
    .groupBy('artist.name')
    .orderBy(sortBy === SortOptionsEnum.JUNE_PLAYS ? SortOptionsEnum.JUNE_PLAYS :
       sortBy === SortOptionsEnum.JULY_PLAYS ? SortOptionsEnum.JULY_PLAYS : 
       sortBy === SortOptionsEnum.AUGUST_PLAYS ? SortOptionsEnum.AUGUST_PLAYS : 
       SortOptionsEnum.OVERALL_PLAYS, order)
    .getRawMany<ListArtistDto>(); 
  }

  async createArtist(artistDto: CreateArtistDto): Promise<ArtistEntity> {
    const artist = this.create(artistDto)
    return this.save(artist)
  }

  async isPopulated(): Promise<number> {
    return this.count()
  }
}