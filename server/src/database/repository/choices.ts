import { EntityRepository, Repository } from 'typeorm';
import { choices } from '../entity/choices';

@EntityRepository(choices)
export class ProblemsRepository extends Repository<choices> {}
