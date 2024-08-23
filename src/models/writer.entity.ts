import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Song } from './song.entity'

@Entity()
export class Writer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Song, (song) => song.writer)
  songs: Song[]
}