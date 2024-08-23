import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
