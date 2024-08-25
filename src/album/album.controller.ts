import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { ListedAlbumDto } from './dtos/listed.album.dto';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { SortOptionsEnum } from 'src/enums/sort.options.enum';

@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    @ApiTags('Albums')
    @ApiOperation({ summary: 'Get sorted albums' })
    @ApiQuery({ name: 'sortBy', enum: [SortOptionsEnum.TITLE, SortOptionsEnum.YEAR], required: false  })
    @ApiQuery({ name: 'order',  enum: SortDirectionEnum, required: false })
    @ApiOkResponse({
        description: 'List of sorted albums',
        type: ListedAlbumDto,
        isArray: true
    })
    getSortedAlbums(
        @Query('sortBy') sortBy?: SortOptionsEnum.TITLE | SortOptionsEnum.YEAR,
        @Query('order') order?: SortDirectionEnum,
    ): Promise<ListedAlbumDto[]> {

        const availableParams = [SortOptionsEnum.TITLE, SortOptionsEnum.YEAR]

        return this.albumService.getSortedAlbums(
            availableParams.includes(sortBy) ? sortBy : SortOptionsEnum.TITLE, 
            SortDirectionEnum[order.toUpperCase()]
        )
    }
}
