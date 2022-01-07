import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { problems } from './problems';

@Entity()
export class choices {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => problems, (problem) => problem.id, {
    onDelete: 'CASCADE',
  })
  problem: number;

  @Column()
  index: number;

  @Column()
  content: string;
}
