import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { sets } from './sets';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  profileImage: string;

  @Column({ default: 'user' })
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => sets, (set) => set.userId)
  set: sets;
}
