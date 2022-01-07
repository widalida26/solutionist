import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { problems } from './problems';

@Entity()
export class usersProblems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  problemId: number;

  @Column()
  choice: number;

  @ManyToOne(() => problems, (problem) => problem.id)
  problem: problems;
}
