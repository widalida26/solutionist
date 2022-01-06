import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ISetsDTO, IProblems, IChoices } from '../interface/ISets';

@Service()
export class SetService {
  constructor(@InjectRepository() private upRepo: uProblemsRepository) {}

  async uProblemsMaker(userId: number, problemId: number, choice: number): Promise<void> {
    // 로그인된 유저가 아닐 경우
    if (userId === -1) {
    }

    await this.upRepo.save({});
  }
}
