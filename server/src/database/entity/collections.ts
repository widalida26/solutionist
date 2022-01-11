import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Timestamp,
  Column,
} from 'typeorm';
import { sets } from './sets';

@Entity()
export class collections {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @OneToMany(() => sets, (set) => set.id, {
    cascade: true,
  })
  set: sets[];
}
