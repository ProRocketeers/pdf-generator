import createConfigMicroOrm from '@backend/configs/mikro-orm.config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): MikroOrmModuleOptions =>
        createConfigMicroOrm(configService),
      inject: [ConfigService],
      driver: PostgreSqlDriver,
    }),
  ],
})
export class CommonModule {}
