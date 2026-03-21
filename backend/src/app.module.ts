import { ConfigModule } from '@nestjs/config'
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module'
import { TemplateModule } from '@backend/template/template.module'
import { VariableModule } from '@backend/variable/variable.module'
import { HealthModule } from '@backend/health/health.module'
import { PdfModule } from '@backend/pdf/pdf.module'
import { LoggerMiddleware } from '@backend/middlewares/logger.middleware'
import mikroOrmConfig from '@backend/configs/mikro-orm.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    HealthModule,
    TemplateModule,
    PdfModule,
    VariableModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
