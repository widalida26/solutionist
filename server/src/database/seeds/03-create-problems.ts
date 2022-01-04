// import { Connection } from 'typeorm';
// import { Factory, Seeder } from 'typeorm-seeding';
// import { problems } from '../entity/problems';
// import { dummyProblems } from '../../../dummy/problems';

// export class CreateInitialUserData implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     await connection
//       .createQueryBuilder()
//       .insert()
//       .into(problems)
//       .values(dummyProblems)
//       .execute();
//   }
// }
