import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { problems } from './problems';

@Entity()
export class solveStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  solver: string;

  @Column()
  problemId: number;

  @Column()
  choice: number;

  @ManyToOne(() => problems, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: problems;
}
