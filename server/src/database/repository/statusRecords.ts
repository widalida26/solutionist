import { EntityRepository, Repository } from 'typeorm';
import { statusRecords } from '../entity/statusRecords';

@EntityRepository(statusRecords)
export class StatusRecordsRepository extends Repository<statusRecords> {}
