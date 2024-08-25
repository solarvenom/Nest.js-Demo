import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Generated } from 'typeorm';
import { AlbumEntity } from '../album/entities/album.entity'
import { ArtistEntity } from '../artist/entities/artist.entity'
import { WriterEntity } from '../writer/entities/writer.entity'

@Entity('songs')
export class SongEntity {
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 50 })
  title: string;

  @Column('int')
  junePlays: number;

  @Column('int')
  julyPlays: number;

  @Column('int')
  augustPlays: number;

  @ManyToOne(() => AlbumEntity, (album) => album.songs, { onDelete: 'CASCADE' })
  album: AlbumEntity

  @ManyToMany(() => ArtistEntity, (artist) => artist.songs, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'songs_artists' })
  artists: ArtistEntity[]

  @ManyToMany(() => WriterEntity, (writer) => writer.songs, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'songs_writers' })
  writers: WriterEntity[]
}