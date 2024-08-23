import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { WriterEntity } from "../entities/writer.entity";
import { CreateWriterDto } from "../dtos/writer/create.writer.dto";

@Injectable()
export class WriterRepository extends Repository<WriterEntity> {
  
  async findAll(): Promise<WriterEntity[]> {
    return this.find()
  }

  async findByName(name: string): Promise<WriterEntity> {
    return this.findOne({ where: { name: name }})
  }

  async createWriter(writerDto: CreateWriterDto): Promise<WriterEntity> {
    const writer = this.create(writerDto)
    return this.save(writer)
  }
}