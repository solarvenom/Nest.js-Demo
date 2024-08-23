import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Song } from './song.entity'

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('int')
  year: number;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[]
}