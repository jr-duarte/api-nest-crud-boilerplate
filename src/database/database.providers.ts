import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: `${process.env.TYPEORM_HOST}`,
        port: 3306,
        username: `${process.env.TYPEORM_USERNAME}`,
        password: `${process.env.TYPEORM_PASSWORD}`,
        database: `${process.env.TYPEORM_DATABASE}`,
        entities: [__dirname + `${process.env.TYPEORM_ENTITIES}`],
        synchronize: false,
      }),
  },
];
