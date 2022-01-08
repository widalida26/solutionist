import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './users';
import { sets } from './sets';

@Entity()
export class solvedSets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setId: number;

  @Column()
  userId: number;

  @Column({
    default: 0,
  })
  answerRate: number;

  @ManyToOne(() => sets, (set) => set.creatorId, {
    onDelete: 'CASCADE',
  })
  set: sets;

  @ManyToOne(() => users, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  user: users;
}
