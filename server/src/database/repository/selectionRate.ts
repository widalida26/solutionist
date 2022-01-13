import { EntityRepository, Repository } from 'typeorm';
import { selectionRate } from '../entity/selectionRate';

@EntityRepository(selectionRate)
export class SelectionRateRepository extends Repository<selectionRate> {}
