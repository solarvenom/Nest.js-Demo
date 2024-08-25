import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { SongEntity } from './song.entity'

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => SongEntity, (song) => song.artists, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}