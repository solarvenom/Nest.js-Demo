import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Generated } from 'typeorm';
import { SongEntity } from '../../entities/song.entity'

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 50, unique: true })
  name: string;

  @ManyToMany(() => SongEntity, (song) => song.artists, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}