import { EntityRepository, Repository } from 'typeorm';
import { solvedSets } from '../entity/solvedSets';

@EntityRepository(solvedSets)
export class SolvedSetsRepository extends Repository<solvedSets> {}
