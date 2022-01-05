import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { ISetsDTO, IProblems, IChoices } from '../interface/ISets';

@Service()
export class SetService {
  constructor(
    @InjectRepository() private setsRepo: SetsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository
  ) {}

  // 세트 삽입
  async setMaker(userId: number, set: ISetsDTO): Promise<Object> {
    // 세트 타이틀이 누락된 경우
    if (!set.title) {
      errorGenerator({ statusCode: 400 });
    }

    // 세트 삽입 후 setId 값 저장
    const savedSets = await this.setsRepo.save({
      userId,
      ...set,
    });

    const problems: IProblems[] = set['problems'];

    // 문제가 배열 형태일 경우에만 저장
    // 문제 없는 세트가 존재하기 때문에 문제 데이터가 없을 경우에도 별도의 에러 없음
    if (Array.isArray(problems)) {
      // 문제 배열에 setId 값 삽입
      const problemsToSave = problems.map((problem) => {
        // 문제의 index나 question 값이 존재하지 않으면 에러
        if (!problem.index || !problem.question) {
          errorGenerator({ statusCode: 400 });
        }
        return this.insertIntoObject(problem, 'setId', savedSets.id);
      });

      // 문제 삽입
      const savedProblems = await this.problemsRepo.save(problemsToSave);

      var choicesToSave = []; // db에 삽입될 형태의 보기 배열
      // 보기 배열에 problemId 값 삽입
      savedProblems.forEach((problem) => {
        const choices = problem['choices'];
        // 보기가 배열 형태일 경우에만 저장
        if (Array.isArray(choices)) {
          // 문제 배열에 setId 값 삽입 후 모든 보기의 배열을 하나로 병합
          choicesToSave = choicesToSave.concat(
            choices.map((choice) => {
              // 보기의 index 값이 존재하지 않으면 에러
              if (!choice.index) {
                errorGenerator({ statusCode: 400 });
              }
              return this.insertIntoObject(choice, 'problemId', problem.id);
            })
          );
        }
      });

      // 보기 삽입
      await this.choicesRepo.save(choicesToSave);
    }

    // 응답에 필요한 객체 리턴
    return {
      id: savedSets.id,
      createdAt: savedSets.createdAt,
      updatedAt: savedSets.updatedAt,
    };
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
