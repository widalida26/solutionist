import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { users } from './users';
import { sets } from './sets';

@Entity()
export class solvedSets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  userId: number;

  @Column()
  setId: number;

  @Column({
    default: 0,
  })
  answerRate: number;

  @ManyToOne(() => users, (user) => user.id)
  user: users;

  @ManyToOne(() => sets, (set) => set.userId, {
    onDelete: 'CASCADE',
  })
  set: sets;
}
