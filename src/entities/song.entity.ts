import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { AlbumEntity } from './album.entity'
import { ArtistEntity } from './artist.entity'
import { WriterEntity } from './writer.entity'

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('int')
  june: number;

  @Column('int')
  july: number;

  @Column('int')
  august: number;

  @ManyToOne(() => AlbumEntity, (album) => album.songs, { onDelete: 'CASCADE' })
  album: AlbumEntity

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'songs_artists' })
  artists: ArtistEntity[]

  @ManyToMany(() => WriterEntity, (writer) => writer.songs, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'songs_writers' })
  writers: WriterEntity[]
}