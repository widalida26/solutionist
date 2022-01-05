import { EntityRepository, Repository } from 'typeorm';
import { sets } from '../entity/sets';

@EntityRepository(sets)
export class SetsRepository extends Repository<sets> {}
