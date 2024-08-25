import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository'

@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
  exports: [ArtistRepository]
})
export class ArtistModule {}
