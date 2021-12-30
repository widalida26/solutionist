import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class usersProblems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  setId: number;

  @Column()
  problemId: number;

  @Column()
  chocie: number;
}
