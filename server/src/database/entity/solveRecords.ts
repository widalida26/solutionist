import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { sets } from './sets';
import { users } from './users';
import { solveStatus } from './solveStatus';
import { statusRecords } from './statusRecords';

@Entity()
export class solveRecords {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setId: number;

  @Column({
    nullable: true,
  })
  userId: number;

  @Column({
    default: -1,
  })
  answerRate: number;

  @ManyToOne(() => sets, (set) => set.id, {
    onDelete: 'CASCADE',
  })
  set: sets;

  @ManyToOne(() => users, (user) => user.id)
  user: users;

  @OneToMany(() => solveStatus, (status) => status.record, {
    cascade: true,
  })
  status: solveStatus[];

  @OneToMany(() => statusRecords, (rate) => rate.record, {
    cascade: true,
  })
  sRec: statusRecords[];
}
