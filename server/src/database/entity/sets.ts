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

@Entity()
export class sets {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => users, (user) => user.id)
  creator: number;

  @ManyToOne(() => users, (user) => user.id)
  editor: users;

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

  @OneToMany(() => problems, (problem) => problem.setId, {
    cascade: true,
  })
  problem: problems[];
}
