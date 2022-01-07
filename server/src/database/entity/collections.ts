import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { sets } from './sets';

@Entity()
export class collections {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => sets, (set) => set.id, {
    cascade: true,
  })
  set: sets[];
}
