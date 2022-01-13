import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { solveRecords } from './solveRecords';
import { solveStatus } from './solveStatus';

@Entity()
export class selectionRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recordId: number;

  @Column()
  statusId: number;

  @Column()
  rate: number;

  @ManyToOne(() => solveRecords, (record) => record.id, {
    onDelete: 'CASCADE',
  })
  record: solveRecords;

  @ManyToOne(() => solveStatus, (status) => status.id, {
    onDelete: 'CASCADE',
  })
  status: solveStatus;
}
