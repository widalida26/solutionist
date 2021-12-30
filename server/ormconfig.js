module.exports = {
  type: 'mysql',
  host: process.env.RDS_HOST,
  port: process.env.RDS_PORT,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  entities: ['dist/src/entity/*{.ts,.js}'],
  migrations: ['dist/src/migration/*{.ts,.js}'],
  subscribers: ['dist/src/subscriber/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
