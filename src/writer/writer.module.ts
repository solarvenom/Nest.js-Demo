import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { WriterRepository } from './writer.repository';

@Module({
  providers: [WriterService, WriterRepository],
  controllers: [WriterController],
  exports: [WriterRepository]
})
export class WriterModule {}
