import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ProblemsRepository } from '../database/repository/problems';
import { ISetsDTO, IProblems, IChoices, ISolveDTO } from '../interface/ISets';
import { solve } from 'src/controllers/sets';
import { problems } from 'src/database/entity/problems';

@Service()
export class uProblemsService {
  constructor(
    @InjectRepository() private upRepo: uProblemsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository
  ) {}

  async uProblemsMaker(solveInfo: ISolveDTO, email?: string): Promise<void> {
    // 필요한 정보가 누락된 경우
    if (!solveInfo.problemId || !solveInfo.choice) {
      errorGenerator({ statusCode: 400 });
    }

    if (!email) {
      // 로그인된 유저가 아닌 경우 임의의 id 설정 => 음수 id 생성
      //const minInt = -214748364;
      //email = Math.floor(Math.random() * (0 - minInt) + minInt);
    }

    const foundProblem = await this.problemsRepo.findOne({ id: solveInfo.problemId });
    // problems 테이블에 problemId에 해당하는 레코드가 없는 경우
    if (!foundProblem) {
      errorGenerator({ statusCode: 400 });
    }

    await this.upRepo.save({
      email,
      ...solveInfo,
    });

    //await this.upRepo.save({});
  }
}
