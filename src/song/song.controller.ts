import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { SongService } from './song.service';
import { PaginateSongDto } from './dtos/paginate.song.dto';
import { SongEntity } from './entities/song.entity';

@Controller('songs')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Get()
    @ApiTags('Songs')
    @ApiOperation({ summary: 'Get a paginated list of songs' })
    @ApiQuery({ name: 'page', type: 'number', required: false  })
    @ApiQuery({ name: 'limit',  type: 'number', required: false })
    @ApiOkResponse({
        description: 'A paginated list of songs',
        type: SongEntity,
        isArray: true
    })
    async getSortedArtiests(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<PaginateSongDto> {

        return this.songService.getPaginatedSongs(page, limit)
    }
}
