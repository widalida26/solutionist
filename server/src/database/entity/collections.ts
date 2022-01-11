import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { sets } from './sets';

@Entity()
export class collections {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Timestamp;

  @OneToMany(() => sets, (set) => set.id, {
    cascade: true,
  })
  set: sets[];
}
