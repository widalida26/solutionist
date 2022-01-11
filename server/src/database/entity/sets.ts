import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { users } from './users';
import { problems } from './problems';

@Entity()
export class sets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  collectionId: number;

  @Column({
    nullable: true,
  })
  creatorId: number;

  @Column({
    nullable: true,
  })
  editorId: number;

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
  creator: users;

  @ManyToOne(() => users, (user) => user.id)
  editor: users;

  @OneToMany(() => problems, (problem) => problem.setId, {
    cascade: true,
  })
  problem: problems[];
}
