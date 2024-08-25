import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
}
