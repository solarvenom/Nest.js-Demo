import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Generated } from 'typeorm';
import { SongEntity } from '../../entities/song.entity'

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 100 })
  title: string;

  @Column('int')
  year: number;

  @OneToMany(() => SongEntity, (song) => song.album, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}