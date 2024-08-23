import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SongEntity } from './song.entity'

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('int')
  year: number;

  @OneToMany(() => SongEntity, (song) => song.album)
  songs: SongEntity[]
}