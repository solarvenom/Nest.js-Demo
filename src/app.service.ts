import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { IGoogleSheetData } from './interfaces/IGoogleSheetData.interface'
import { ISong } from './interfaces/ISong.interface'
import { AlbumRepository } from './repositories/album.repository';
import { ArtistRepository } from './repositories/artist.repository';
import { WriterRepository } from './repositories/writer.repository';
import { SongRepository } from './repositories/song.repository';

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
    private readonly httpService: HttpService
  ) {}

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
        june: row.c[5].v,
        july: row.c[6].v,
        august: row.c[7].v
      }
    })

    return sanitizedList
  }

  getHello(): string {
    return 'Hello World!';
  }
}
