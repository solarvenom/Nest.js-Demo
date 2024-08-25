import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, Generated } from 'typeorm';
import { SongEntity } from './song.entity'

@Entity('writers')
export class WriterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => SongEntity, (song) => song.writers, { onDelete: 'CASCADE' })
  songs: SongEntity[]
}