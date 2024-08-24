import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { SongEntity } from './song.entity'

@Entity('writers')
export class WriterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => SongEntity, (song) => song.writer)
  songs: SongEntity[]
}