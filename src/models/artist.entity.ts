import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Song } from './song.entity'

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => Song, (song) => song.artist)
  songs: Song[]
}