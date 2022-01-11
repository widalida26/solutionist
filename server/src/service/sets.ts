import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ProblemsRepository } from '../database/repository/problems';
import { ChoicesRepository } from '../database/repository/choices';
import { CollectionsRepository } from '../database/repository/collections';
import { ISets, IProblems, IChoices } from '../interface/ISets';
import { insertIntoObject } from '../utils/custom';

@Service()
export class SetService {
  constructor(
    @InjectRepository() private setsRepo: SetsRepository,
    @InjectRepository() private problemsRepo: ProblemsRepository,
    @InjectRepository() private choicesRepo: ChoicesRepository,
    @InjectRepository() private collectionRepo: CollectionsRepository
  ) {}

  // 타이틀로 세트 검색
  async SetFinder(title: string) {
    const foundSets = await this.setsRepo.findSetsByTitle(title);
    console.log(foundSets);
    return {};
  }

  // 세트 생성 => collection 테이블에 추가
  async setCreator(set: ISets, creatorId: number) {
    // collection 생성
    set.collectionId = await this.collectionRepo
      .save({ id: null, creatorId })
      .then((collection) => collection.id);

    // collection 생성이 실패했을 경우
    if (!set.collectionId) {
      errorGenerator({ statusCode: 500 });
    }

    // 세트 제작
    const madeSet = await this.setMaker(set);
    // 생성 정보 세팅
    return {
      title: madeSet.title,
      createdAt: madeSet.createdAt,
    };
  }

  // 세트 수정 => sets 테이블에만 추가
  async setModifier(set: ISets) {
    // collection의 생성 일자 검색
    const collectionCreatedAt = await this.setsRepo.findCollectionCreatedAt(
      set.collectionId
    );
    // collection이 없거나 collection에 해당하는 set가 없을 경우
    if (!collectionCreatedAt) {
      errorGenerator({ statusCode: 400 });
    }

    // 세트 제작
    const madeSet = await this.setMaker(set);
    // 수정 정보 세팅
    return {
      title: madeSet.title,
      createdAt: collectionCreatedAt,
      upatedAt: madeSet.createdAt,
    };
  }

  // 세트 삽입
  async setMaker(set: ISets) {
    // 세트 타이틀이 누락된 경우
    if (!set.title) {
      errorGenerator({ statusCode: 400 });
    }

    // 세트 삽입 후 setId 값 저장
    const savedSet = await this.setsRepo.save({
      ...set,
    });

    // 세트가 저장되지 않았을 때
    if (!savedSet) {
      errorGenerator({ statusCode: 500 });
    }

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
        // db에 적합한 형태로 problems 변환 => setId 삽입
        return insertIntoObject(problem, 'setId', savedSet.id);
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
              return insertIntoObject(choice, 'problemId', problem.id);
            })
          );
        }
      });

      // 보기가 2개 미만인 경우
      if (choicesToSave.length < 2) {
        errorGenerator({ statusCode: 400 });
      }

      // 보기 삽입
      await this.choicesRepo.save(choicesToSave);
    }

    return savedSet;
    // 응답에 필요한 객체 리턴
  }

  // 세트 삭제
  // async setRemover(id: number): Promise<number> {
  //   return await this.setsRepo.getRemovedUser(id);
  // }
}
