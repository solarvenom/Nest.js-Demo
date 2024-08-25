import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { WriterService } from './writer.service';
import { SortOptionsEnum } from '../enums/sort.options.enum';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { ListWriterDto } from './dtos/list.writer.dto';


@Controller('writers')
export class WriterController {
    constructor(private readonly writerService: WriterService) {}
    
    @Get()
    @ApiTags('Artists')
    @ApiOperation({ summary: 'Get a sortable list of writers with song and album count' })
    @ApiQuery({ name: 'sortBy', enum: [
        SortOptionsEnum.NAME, 
        SortOptionsEnum.SONGS,
        SortOptionsEnum.ALBUMS,
    ], required: false  })
    @ApiQuery({ name: 'order',  enum: SortDirectionEnum, required: false })
    @ApiOkResponse({
        description: 'List of sortable writers',
        type: ListWriterDto,
        isArray: true
    })
    async getSortedArtiests(
        @Query('sortBy') sortBy?: SortOptionsEnum.NAME | SortOptionsEnum.SONGS | SortOptionsEnum.ALBUMS,
        @Query('order') order?: SortDirectionEnum,
    ): Promise<ListWriterDto[]> {
        const availableParams = [
            SortOptionsEnum.NAME, 
            SortOptionsEnum.SONGS,
            SortOptionsEnum.ALBUMS,
        ]

        return this.writerService.getSortedArtists(
            availableParams.includes(sortBy) ? sortBy : SortOptionsEnum.NAME, 
            order ? SortDirectionEnum[order.toUpperCase()] : SortDirectionEnum.ASC
        )
    }
}
