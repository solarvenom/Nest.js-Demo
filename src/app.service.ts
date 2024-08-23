import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IGoogleSheetData } from './interfaces/IGoogleSheetData.interface'
import { ISong } from './interfaces/ISong.interface'

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

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
