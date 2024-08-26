import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('General')
  @ApiOperation({ summary: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sync')
  @ApiTags('General')
  @ApiOperation({ summary: 'When called this endpoint parses the songlist from the google table and populates the database with song data' })
  syncSongData(): Promise<void> {
    return this.appService.syncSongList()
  }

  @Get('search')
  @ApiTags('General')
  @ApiOperation({ summary: 'Endpoint for the handles requests from a search field on the client' })
  @ApiQuery({ name: 'searchTerm', required: true })
  async search(
    @Query('searchTerm') searchTerm: string,
  ): Promise<any> {
    return this.appService.fullTextSearch(searchTerm)
  }
}
