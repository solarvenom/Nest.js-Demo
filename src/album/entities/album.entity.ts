import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated, Index } from 'typeorm';
import { SongEntity } from '../../song/entities/song.entity'

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Index({ unique: true})
  @Column({ length: 100 })
  title: string;

  @Column('int')
  year: number;

  @OneToMany(() => SongEntity, (song) => song.album, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}