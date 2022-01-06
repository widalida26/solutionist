import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ISetsDTO, IProblems, IChoices, ISolveDTO } from '../interface/ISets';

@Service()
export class uProblemsService {
  constructor(@InjectRepository() private upRepo: uProblemsRepository) {}

  async uProblemsMaker(solveInfo: ISolveDTO, userId?: number): Promise<void> {
    // 필요한 정보가 누락된 경우
    if (!solveInfo.problemId || !solveInfo.choice) {
      errorGenerator({ statusCode: 400 });
    }

    if (!userId) {
      // 로그인된 유저가 아닌 경우 임의의 id 설정 => 음수 id 생성
      const minInt = -214748364;
      userId = Math.floor(Math.random() * (0 - minInt) + minInt);
    }

    this.upRepo.save({
      userId,
      ...solveInfo,
    });

    await this.upRepo.save({});
  }
}
