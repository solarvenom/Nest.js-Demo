import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sync')
  @ApiOperation({ summary: 'When called this endpoint parses the songlist from the google table and populates the database with song data' })
  syncSongData(): Promise<any> {
    return this.appService.syncSongList()
  }
}
