import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
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

  @ManyToOne(() => AlbumEntity, (album) => album.songs)
  album: AlbumEntity

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs)
  artist: ArtistEntity[]

  @ManyToMany(() => WriterEntity, (writer) => writer.songs)
  writer: WriterEntity[]
}