import 'reflect-metadata';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';
import { ISetsDTO } from '../interface/ISets';
import { SetsRepository } from '../database/repository/sets';

@Service()
export class SetService {
  constructor(@InjectRepository() private setsRepo: SetsRepository) {}

  // 세트 정보 삽입
  async setMaker(userId: number, set: ISetsDTO) {
    await this.setsRepo.save({
      userId,
      ...set,
    });
  }

  // 세트 정보 삭제
  async setRemover(title: string): Promise<void> {
    await this.setsRepo.delete({ title: title });
  }
}
