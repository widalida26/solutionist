import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Timestamp,
} from 'typeorm';
import { users } from './users';
import { problems } from './problems';
import { usersProblems } from './usersProblems';
import { JoinTableMultipleColumnsOptions } from 'typeorm/decorator/options/JoinTableMultipleColumnsOptions';

@Entity()
export class sets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  userId: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => users, (user) => user.id)
  user: users;

  @OneToMany(() => problems, (problem) => problem.setId, {
    cascade: true,
  })
  problem: problems;

  @OneToMany(() => usersProblems, (uProblem) => uProblem.setId)
  uProblem: usersProblems;
}
