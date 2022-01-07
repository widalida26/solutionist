import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { uProblemsRepository } from '../database/repository/usersProblems';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from 'src/database/repository/choices';
import { ISets, IProblems, IChoices, ISolve } from '../interface/ISets';
import { solve } from '../controllers/sets';
import { problems } from '../database/entity/problems';
import { v4 } from 'uuid';

@Service()
export class uProblemsService {
  constructor(
    @InjectRepository() private upRepo: uProblemsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository
  ) {}

  async uProblemsMaker(solveInfo: ISolve, email?: string): Promise<void> {
    // 필요한 정보가 누락된 경우
    if (!solveInfo.problemId || !solveInfo.choice) {
      errorGenerator({ statusCode: 400 });
    }

    // 로그인된 유저가 아닌 경우 임의의 id 설정
    if (!email) {
      email = v4();
    }

    // problems 테이블에 problem id가 있는지 조회
    const foundProblem = await this.problemsRepo.findOne({ id: solveInfo.problemId });
    // problems 테이블에 problemId에 해당하는 레코드가 없는 경우
    if (!foundProblem) {
      errorGenerator({ statusCode: 400 });
    }

    // choice가 유효한지 확인 => 0 이하거나 가장 마지막 index보다 크면 안됨
    const maxIdx = await this.choicesRepo.getLastChoice();
    if (solveInfo.choice <= 0 || solveInfo.choice > maxIdx) {
      errorGenerator({ statusCode: 400 });
    }

    // 풀이 정보 삽입
    const id = await this.upRepo
      .save({
        ...solveInfo,
        email,
      })
      .then((result) => result.id);

    const counted = await this.upRepo.countByChoice(solveInfo.problemId);

    console.log(counted);
    const selectionRates = {};
    let total = 0;

    console.log('total', total);
    for (let i = 1; i <= maxIdx; i++) {
      // if (counted['select'].choice === i) {
      // }
    }

    console.log('data', counted);
    //const Cnt = await this.upRepo.count({ problemId: solveInfo.problemId });
  }
}
