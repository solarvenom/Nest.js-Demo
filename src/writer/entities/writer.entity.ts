import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Generated, Index } from 'typeorm';
import { SongEntity } from '../../song/entities/song.entity'

@Entity('writers')
export class WriterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Index({ unique: true})
  @Column({ length: 50, unique: true })
  name: string;

  @ManyToMany(() => SongEntity, (song) => song.writers, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}