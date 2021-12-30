import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { users } from './users';

@Entity()
export class sets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  userId: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => users, (user) => user.id)
  user: users;
}
