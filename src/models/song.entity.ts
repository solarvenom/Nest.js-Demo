import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Album } from './album.entity'
import { Artist } from './artist.entity'
import { Writer } from './writer.entity'

@Entity()
export class Song {
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

  @ManyToOne(() => Album, (album) => album.songs)
  album: Album

  @ManyToMany(() => Artist, (artist) => artist.songs)
  artist: Artist[]

  @ManyToMany(() => Writer, (writer) => writer.songs)
  writer: Writer[]
}