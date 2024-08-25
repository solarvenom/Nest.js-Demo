import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleSheetData } from './interfaces/IGoogleSheetData.interface'
import { ISong } from './interfaces/ISong.interface'
import { AlbumRepository } from './album/album.repository';
import { ArtistRepository } from './artist/artist.repository';
import { WriterRepository } from './writer/writer.repository';
import { SongRepository } from './repositories/song.repository';
import { CreateAlbumDto } from './album/dtos/create.album.dto';
import { CreateArtistDto } from './artist/dtos/create.artist.dto';
import { CreateWriterDto } from './writer/dtos/create.writer.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AlbumRepository)
    private readonly albumRepository: AlbumRepository,
    @InjectRepository(ArtistRepository)
    private readonly artistRepository: ArtistRepository,
    @InjectRepository(WriterRepository)
    private readonly writerRepository: WriterRepository,
    @InjectRepository(SongRepository)
    private readonly songRepository: SongRepository,
    private dataSource: DataSource,
    private readonly httpService: HttpService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async syncSongList(): Promise<void> {

    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const tablesPopulated = await this.areTablesPopulated()
      if(tablesPopulated) await this.clearDb() 

      const songList = await this.fetchSongList() 
      const parsedAlbumsArtistsWriters = this.parseAlbumsArtistsWriters(songList)

      const [createdAlbums, createdArtists, createdWriters] = await Promise.all([
        this.albumRepository.create(parsedAlbumsArtistsWriters.albums),
        this.artistRepository.create(parsedAlbumsArtistsWriters.artists),
        this.writerRepository.create(parsedAlbumsArtistsWriters.writers),
      ])

      await Promise.all([
        this.albumRepository.save(createdAlbums),
        this.artistRepository.save(createdArtists),
        this.writerRepository.save(createdWriters)
      ])

      const songsToCreate = []
      for(const song of songList) {
        const songAlbum = createdAlbums.find(album => album.title == song.album)
        const songArtists = song.artist.map((songArtist) => createdArtists.find(artist => artist.name == songArtist))
        const songWriters = song.author.map((songWriter => createdWriters.find(writer => writer.name == songWriter)))

        songsToCreate.push({
          title: song.song,
          junePlays: Number(song.junePlays),
          julyPlays: Number(song.julyPlays),
          augustPlays: Number(song.augustPlays),
          album: songAlbum,
          artists: songArtists,
          writers: songWriters
        })
      }

      const createdSongs = this.songRepository.create(songsToCreate)
      await this.songRepository.save(createdSongs)
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async areTablesPopulated(): Promise<boolean> {
    const [albumsPopulated, artistsPopulated, writersPopulated, songsPopulated] = await Promise.all([
      this.albumRepository.isPopulated(),
      this.artistRepository.isPopulated(),
      this.writerRepository.isPopulated(),
      this.songRepository.isPopulated()
    ])

    if(albumsPopulated || artistsPopulated || writersPopulated || songsPopulated) return true
    return false
  }

  async clearDb(): Promise<void> {
    await Promise.all([
      this.albumRepository.delete({}),
      this.artistRepository.delete({}),
      this.writerRepository.delete({}),
      this.songRepository.delete({})
    ])
  }

  async fetchSongList(): Promise<ISong[]> {
    let songList = await this.httpService.axiosRef.get(process.env.SONG_LIST_URL).then((res) => res.data)
    songList = JSON.parse(songList.replace('/*O_o*/', '')
                .replace(/(\r\n|\n|\r)/gm, '')
                .replace('google.visualization.Query.setResponse({"version"', '{"version"')
                .replace('featuring ', '')
                .replace(');', ''))

    return this.sanitizeSongList(songList)
  }
  
  sanitizeSongList(list: IGoogleSheetData): ISong[] {
    const listTableRows = list.table.rows
    const sanitizedList = listTableRows.map((row) => {
      return {
        song: row.c[0].v,
        artist: row.c[1].v.split('\n'),
        author: row.c[2].v.split('\n'),
        album: row.c[3].v,
        year: row.c[4].v,
        junePlays: row.c[5].v,
        julyPlays: row.c[6].v,
        augustPlays: row.c[7].v
      }
    })

    return sanitizedList
  }

  parseAlbumsArtistsWriters(songList: ISong[]): { 
    albums: CreateAlbumDto[],
    artists: CreateArtistDto[],
    writers: CreateWriterDto[]
  } {
    const [albums, artists, writers] = [[], [], []]

    for(const song of songList){
      const album: CreateAlbumDto = {title: song.album, year: Number(song.year)}
      
      if(!(albums.some((e) => e.title == album.title))) albums.push(album)

      for(const artistName of song.artist){
        const artist: CreateArtistDto = { name: artistName }
        if(!(artists.some((e) => e.name == artist.name))) artists.push(artist)
      }

      for(const writerName of song.author){
        const writer: CreateWriterDto = { name: writerName }
        if(!(writers.some((e) => e.name == writer.name))) writers.push(writer)
      }
    }

    return {
      albums: albums,
      artists: artists,
      writers: writers,
    }
  }
}
