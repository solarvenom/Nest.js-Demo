import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistRepository } from './repositories/artist.repository';
import { WriterRepository } from './repositories/writer.repository';
import { SongRepository } from './repositories/song.repository';
import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './entities/artist.entity';
import { WriterEntity } from './entities/writer.entity';
import { SongEntity } from './entities/song.entity';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_CONTAINER_NAME,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        AlbumEntity, 
        ArtistEntity, 
        WriterEntity, 
        SongEntity
      ],
      synchronize: true,
    }),
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    ArtistRepository,
    WriterRepository,
    SongRepository
  ],
})
export class AppModule {}
