import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { ListArtistDto } from './dtos/list.artist.dto'
import { SortOptionsEnum } from '../enums/sort.options.enum';
import { SortDirectionEnum } from '../enums/sort.direction.enum';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artists')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}


    @Get()
    @ApiTags('Artists')
    @ApiOperation({ summary: 'Get a list of all artists' })
    @ApiOkResponse({
        description: 'List of artists',
        type: ListArtistDto,
        isArray: true
    })
    async getAllArtists(): Promise<ArtistEntity[]> {
        return this.artistService.getAllArtists()
    }

    @Get('/rankings')
    @ApiTags('Artists')
    @ApiOperation({ summary: 'Get a sortable list of artists with play data' })
    @ApiQuery({ name: 'sortBy', enum: [
        SortOptionsEnum.NAME, 
        SortOptionsEnum.JUNE_PLAYS,
        SortOptionsEnum.JULY_PLAYS,
        SortOptionsEnum.AUGUST_PLAYS,
        SortOptionsEnum.OVERALL_PLAYS
    ], required: false  })
    @ApiQuery({ name: 'order',  enum: SortDirectionEnum, required: false })
    @ApiOkResponse({
        description: 'List of sortable artists',
        type: ListArtistDto,
        isArray: true
    })
    async getSortedArtiests(
        @Query('sortBy') sortBy?: SortOptionsEnum.NAME | SortOptionsEnum.JUNE_PLAYS | SortOptionsEnum.JULY_PLAYS |
            SortOptionsEnum.AUGUST_PLAYS | SortOptionsEnum.OVERALL_PLAYS,
        @Query('order') order?: SortDirectionEnum,
    ): Promise<ListArtistDto[]> {
        const availableParams = [
            SortOptionsEnum.NAME, 
            SortOptionsEnum.JUNE_PLAYS,
            SortOptionsEnum.JULY_PLAYS,
            SortOptionsEnum.AUGUST_PLAYS,
            SortOptionsEnum.OVERALL_PLAYS
        ]

        return this.artistService.getSortedArtists(
            availableParams.includes(sortBy) ? sortBy : SortOptionsEnum.NAME, 
            order ? SortDirectionEnum[order.toUpperCase()] : SortDirectionEnum.DESC
        )
    }
}
