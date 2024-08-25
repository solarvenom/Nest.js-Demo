import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiOkResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { ListAlbumDto } from './dtos/list.album.dto';
import { InspectAlbumDto } from './dtos/inspect.album.dto';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { SortOptionsEnum } from 'src/enums/sort.options.enum';

@Controller('albums')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    @ApiTags('Albums')
    @ApiOperation({ summary: 'Get a sortable list of all albums' })
    @ApiQuery({ name: 'sortBy', enum: [SortOptionsEnum.TITLE, SortOptionsEnum.YEAR], required: false  })
    @ApiQuery({ name: 'order',  enum: SortDirectionEnum, required: false })
    @ApiOkResponse({
        description: 'List of sortable albums',
        type: ListAlbumDto,
        isArray: true
    })
    async getSortedAlbums(
        @Query('sortBy') sortBy?: SortOptionsEnum.TITLE | SortOptionsEnum.YEAR,
        @Query('order') order?: SortDirectionEnum,
    ): Promise<ListAlbumDto[]> {

        const availableParams = [SortOptionsEnum.TITLE, SortOptionsEnum.YEAR]

        return this.albumService.getSortedAlbums(
            availableParams.includes(sortBy) ? sortBy : SortOptionsEnum.TITLE, 
            order ? SortDirectionEnum[order.toUpperCase()] : SortDirectionEnum.ASC
        )
    }

    @Get(':uuid')
    @ApiTags('Albums')
    @ApiOperation({ summary: 'Get detailed information about an album by UUID' })
    @ApiParam({ name: 'uuid', required: true, description: 'UUID of an album' })
    @ApiOkResponse({
        description: 'Detailed information about a specific album',
        type: InspectAlbumDto,
        isArray: false
    })
    async getAlbumDetails(@Param() params: { uuid: string }): Promise<Partial<InspectAlbumDto>> {
        return this.albumService.getAlbumByUUID(params.uuid)
    }
}
