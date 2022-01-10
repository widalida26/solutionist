import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { problems } from './problems';

@Entity()
export class choices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  problemId: number;

  @Column()
  index: number;

  @Column()
  content: string;

  @ManyToOne(() => problems, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: problems;
}
