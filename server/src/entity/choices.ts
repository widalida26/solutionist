import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({
    default: 0,
  })
  selectionRate: number;
}
