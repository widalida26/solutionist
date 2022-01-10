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
  entities: ['src/database/entity/*{.ts,.js}', __dirname + '/entity/*.js'],
  migrations: ['src/database/migration/*{.ts,.js}', __dirname + '/entity/*.js'],
  subscribers: ['src/database/subscriber/*{.ts,.js}', __dirname + '/entity/*.js'],
  cli: {
    entitiesDir: 'src/database/entity',
    migrationsDir: 'src/database/migration',
    subscribersDir: 'src/database/subscriber',
  },
};
