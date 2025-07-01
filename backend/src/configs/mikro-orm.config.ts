import { MikroOrmModuleOptions } from '@mikro-orm/nestjs/typings';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const createConfigMicroOrm = (
  configService: ConfigService | 'default',
): MikroOrmModuleOptions => {
  if (configService === 'default') {
    configService = new ConfigService(process.env);
  }

  const host = configService.get<string>('DB_HOST', '');
  const useSSL = host !== 'localhost';

  return {
    entities: ['./dist/**/**/*.entity.js'],
    entitiesTs: ['./src/**/**/*.entity.ts'],
    driver: PostgreSqlDriver,
    host: configService.get<string>('DB_HOST', ''),
    port: configService.get<number>('DB_PORT', 5432),
    user: configService.get<string>('DB_USER', ''),
    password: configService.get<string>('DB_PASSWORD', ''),
    dbName: configService.get<string>('DB_NAME', ''),
    driverOptions: {
      connection: useSSL
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {},
    },
    migrations: {
      path: './dist/migrations',
      pathTs: './src/migrations',
    },
    seeder: {
      path: './dist/seeders',
      pathTs: './src/seeders',
      defaultSeeder: 'DatabaseSeeder',
    },
  };
};

export default createConfigMicroOrm;
