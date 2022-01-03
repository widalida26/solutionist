module.exports = {
  type: 'mysql',
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  entities: ['dist/src/database/entity/*{.ts,.js}'],
  migrations: ['dist/src/database/migration/*{.ts,.js}'],
  subscribers: ['dist/src/database/subscriber/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
};
