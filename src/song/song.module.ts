import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongRepository } from './song.repository';

@Module({
  controllers: [SongController],
  providers: [SongService, SongRepository],
  exports: [SongRepository]
})
export class SongModule {}
