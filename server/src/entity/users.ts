import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { sets } from './sets';
import { solvedSets } from './solvedSets';

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

  @OneToMany(() => solvedSets, (solved) => solved.userId)
  solved: solvedSets;
}
