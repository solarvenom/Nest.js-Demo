import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SongEntity } from './song.entity'

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column('int')
  year: number;

  @OneToMany(() => SongEntity, (song) => song.album, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}