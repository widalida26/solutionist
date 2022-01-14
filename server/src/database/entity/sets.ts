import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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
  collectionId: number;

  @Column({ nullable: true })
  editorId: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  description: string;

  @CreateDateColumn()
  createdAt: Timestamp;

  @ManyToOne(() => collections, (collection) => collection.id, {
    onDelete: 'CASCADE',
  })
  collection: collections;

  @ManyToOne(() => users, (user) => user.id)
  editor: users;

  @OneToMany(() => problems, (problem) => problem.set, {
    cascade: true,
  })
  problem: problems[];

  @ManyToOne(() => sets, (set) => set.children)
  parent: sets;

  @OneToMany(() => sets, (set) => set.parent)
  children: sets[];
}
