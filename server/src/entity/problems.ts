import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
