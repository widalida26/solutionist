import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { sets } from './sets';
import { choices } from './choices';
import { usersProblems } from './usersProblems';

@Entity()
export class problems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setId: number;

  @Column()
  index: number;

  @Column()
  question: string;

  @Column({
    nullable: true,
  })
  answer: number;

  @Column({
    nullable: true,
  })
  explanation: string;

  @Column()
  isOX: boolean;

  @ManyToOne(() => sets, (set) => set.id, {
    onDelete: 'CASCADE',
  })
  set: sets;

  @OneToMany(() => choices, (choice) => choice.problem, {
    cascade: true,
  })
  choice: choices[];

  @OneToMany(() => usersProblems, (uProblem) => uProblem.problem)
  uProblem: usersProblems[];
}
