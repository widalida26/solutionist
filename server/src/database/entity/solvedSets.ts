import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './users';
import { sets } from './sets';

@Entity()
export class solvedSets {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => users, (user) => user.id)
  user: number;

  @ManyToOne(() => sets, (set) => set.creator, {
    onDelete: 'CASCADE',
  })
  set: number;

  @Column({
    default: 0,
  })
  answerRate: number;
}
