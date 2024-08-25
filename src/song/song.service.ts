import { Injectable } from '@nestjs/common';
import { SongRepository } from './song.repository';
import { PaginateSongDto } from './dtos/paginate.song.dto';


@Injectable()
export class SongService {
    constructor(
        private readonly songRepository: SongRepository,
      ) {}
    
    async getPaginatedSongs(
        page = 1,
        limit = 25
    ): Promise<PaginateSongDto> {
        const [data, total] = await this.songRepository.findAndCount({
            skip: page > 0 ? (page - 1) * limit : 0,
            take: limit,
          });
        
          return {
            data,
            total,
            page,
            limit,
          };
    }
}


