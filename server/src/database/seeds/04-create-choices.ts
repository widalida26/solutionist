import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { choices } from '../entity/choices';
import { dummyChoices } from '../../../dummy/choices';

export class CreateInitialUserData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(choices)
      .values(dummyChoices)
      .execute();
  }
}
