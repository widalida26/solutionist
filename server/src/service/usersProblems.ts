import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ISetsDTO, IProblems, IChoices } from '../interface/ISets';

@Service()
export class SetService {
  constructor(@InjectRepository() private setsRepo: uProblemsRepository) {}
}
