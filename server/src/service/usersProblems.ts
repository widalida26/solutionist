import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ProblemsRepository } from '../database/repository/problems';
import { ISetsDTO, IProblems, IChoices, ISolveDTO } from '../interface/ISets';
import { solve } from '../controllers/sets';
import { problems } from '../database/entity/problems';
import { v4 } from 'uuid';

@Service()
export class uProblemsService {
  constructor(
    @InjectRepository() private upRepo: uProblemsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository
  ) {}

  async uProblemsMaker(solveInfo: ISolveDTO, email?: string): Promise<void> {
    // 필요한 정보가 누락된 경우
    if (!solveInfo.problem || !solveInfo.choice) {
      errorGenerator({ statusCode: 400 });
    }

    // 로그인된 유저가 아닌 경우 임의의 id 설정
    if (!email) {
      email = v4();
    }

    // problems 테이블에 problem id가 있는지 조회
    const foundProblem = await this.problemsRepo.findOne({ id: solveInfo.problem });
    // problems 테이블에 problemId에 해당하는 레코드가 없는 경우
    if (!foundProblem) {
      errorGenerator({ statusCode: 400 });
    }

    // choice가 유효한지 확인
    // problems 테이블에서 조회
    console.log(solveInfo.choice);
    // 풀이 정보 삽입
    await this.upRepo.save({
      email,
      ...solveInfo,
    });

    const totalCnt = await this.upRepo.count({ problem: solveInfo.problem });
    const data = await this.upRepo.countByChoice(solveInfo.problem);
    console.log('data', data);
    //const Cnt = await this.upRepo.count({ problemId: solveInfo.problemId });

    console.log(totalCnt);
  }
}
