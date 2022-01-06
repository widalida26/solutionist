import { EntityRepository, Repository } from 'typeorm';
import { usersProblems } from '../entity/usersProblems';

@EntityRepository(usersProblems)
export class uProblemsRepository extends Repository<usersProblems> {}
