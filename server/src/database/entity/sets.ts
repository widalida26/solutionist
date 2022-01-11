import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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
  createdAt: Timestamp;

  @ManyToOne(() => collections, (collection) => collection.id, {
    onDelete: 'CASCADE',
  })
  collection: collections;

  @ManyToOne(() => users, (user) => user.id)
  creator: users;

  @ManyToOne(() => users, (user) => user.id)
  editor: users;

  @OneToMany(() => problems, (problem) => problem.setId, {
    cascade: true,
  })
  problem: problems[];
}
