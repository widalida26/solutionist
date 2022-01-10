import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { solvedSets } from '../database/entity/solvedSets';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { ISolve } from '../interface/ISets';

@Service()
export class SolvedService {
  constructor(@InjectRepository() private solved: solvedSets) {}
}
