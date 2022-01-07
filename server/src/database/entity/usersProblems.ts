import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { problems } from './problems';

@Entity()
export class usersProblems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @ManyToOne(() => problems, (problem) => problem.id)
  problem: number;

  @Column()
  choice: number;
}
