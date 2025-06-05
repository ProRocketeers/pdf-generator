import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import createConfigMicroOrm from 'src/configs/mikro-orm.config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { HealthModule } from '@backend/health/health.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
      HealthModule,
      /*MikroOrmModule.forRootAsync({
        useFactory: (
          configService: ConfigService,
        ): MikroOrmModuleOptions => createConfigMicroOrm(configService),
        inject: [ConfigService],
        driver: PostgreSqlDriver, 
    }),*/
  ]
})
export class AppModule {}
