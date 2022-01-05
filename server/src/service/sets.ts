import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ProblemsRepository } from '../database/repository/problems';
import { ISetsDTO, IProblems } from '../interface/ISets';

@Service()
export class SetService {
  constructor(
    @InjectRepository() private setsRepo: SetsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository
  ) {}

  // 세트 삽입
  async setMaker(userId: number, set: ISetsDTO): Promise<void> {
    // 세트 타이틀이 누락된 경우
    if (!set.title) {
      errorGenerator({ statusCode: 400 });
    }

    // 세트 저장 후 setId 값 저장
    const setId = await this.setsRepo
      .save({
        userId,
        ...set,
      })
      .then((result) => result.id);

    const problems: IProblems[] = set['problems'];

    // 문제가 있을 경우에만 저장
    if (problems) {
      // 문제 배열에 setId 값 삽입
      const problemsWithSetId = problems.map((problem) =>
        this.setIdToProblems(problem, setId)
      );

      await this.problemsRepo.save(problemsWithSetId);
    }
  }

  // 세트 삭제
  async setRemover(id: number): Promise<void> {
    await this.setsRepo.delete({ id });
  }

  setIdToProblems = (problem: object, setId: number) => {
    return { ...problem, setId };
  };
}
