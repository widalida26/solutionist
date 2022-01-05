import errorGenerator from '../error/errorGenerator';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { SetsRepository } from '../database/repository/sets';
import { ISetsDTO } from '../interface/ISets';

@Service()
export class SetService {
  constructor(@InjectRepository() private setsRepo: SetsRepository) {}

  // 세트 삽입
  async setMaker(userId: number, set: ISetsDTO): Promise<void> {
    // 세트 타이틀이 누락된 경우
    if (!set.title) {
      errorGenerator({ statusCode: 400 });
    }

    await this.setsRepo.save({
      userId,
      ...set,
    });
  }
  // 세트 삭제
  async setRemover(id: number): Promise<void> {
    await this.setsRepo.delete({ id });
  }
}
