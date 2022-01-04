import { Repository } from 'typeorm';
import { Service } from 'typedi';
import { sets } from '../database/entity/sets';
import { ISetsDTO } from '../interface/ISets';

@Service()
export class SetService {
  constructor(private setsRepo: Repository<sets>) {
    this.setsRepo = setsRepo;
  }

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
