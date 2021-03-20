export default {
  type: 'mysql',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  port: Number(process.env.DATABASE_PORT || 3310),
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_DATABASE || 'pipedriveDB',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || false,
  migrationsRun: false,
  dropSchema: false,
  logging: process.env.TYPEORM_LOGGING === 'true' || true,
  retryAttempts: Number(process.env.TYPEORM_RETRY) || 0,
};
