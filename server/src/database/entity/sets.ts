import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { collections } from './collections';
import { users } from './users';
import { problems } from './problems';

@Entity()
export class sets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  collection: number;

  @ManyToOne(() => users, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'creatorId' })
  creator: number;

  @ManyToOne(() => users, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'editorId' })
  editor: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => collections, (collection) => collection.id, {
    onDelete: 'CASCADE',
  })
  set: sets;

  @OneToMany(() => problems, (problem) => problem.setId, {
    cascade: true,
  })
  problem: problems[];
}
