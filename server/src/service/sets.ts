import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ProblemsRepository } from '../database/repository/problems';
import { ISetsDTO, IProblems, IChoices } from '../interface/ISets';

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

    // 세트 삽입 후 setId 값 저장
    const setId = await this.setsRepo
      .save({
        userId,
        ...set,
      })
      .then((result) => result.id);

    const problems: IProblems[] = set['problems'];

    // 문제가 배열 형태일 경우에만 저장
    if (Array.isArray(problems)) {
      // 문제 배열에 setId 값 삽입
      const problemsToSave = problems.map((problem) =>
        this.insertIntoObject(problem, 'setId', setId)
      );

      // 문제 삽입
      const savedProblems = await this.problemsRepo.save(problemsToSave);

      var choicesToSave = [];
      // 보기 배열에 problemId 값 삽입
      savedProblems.forEach((problem) => {
        const choices = problem['choices'];
        // 보기가 배열 형태일 경우에만 저장
        if (Array.isArray(choices)) {
          // 문제 배열에 setId 값 삽입 후 모든 문제의 배열을
          choicesToSave = choicesToSave.concat(
            choices.map((choice) => {
              return this.insertIntoObject(choice, 'problemId', problem.id);
            })
          );
        }
      });

      //console.log``
      //await this.chocies.save(choicesToSave);
    }
    // 문제 없는 세트가 존재하기 때문에 문제 데이터가 없을 경우에도 별도의 에러 없음
  }

  // 세트 삭제
  async setRemover(id: number): Promise<void> {
    await this.setsRepo.delete({ id });
  }

  // db에 적합한 형태로 problems 변환 => setId 삽입
  insertIntoObject = (obj: object, key: string, id: number): Object => {
    obj[key] = id;
    return obj;
  };
}
