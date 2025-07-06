import { TemplateModule } from '@backend/template/template.module'
import { VariableModule } from '@backend/variable/variable.module'
import { CommonModule } from '@backend/common/common.module'
import { HealthModule } from '@backend/health/health.module'
import { PdfModule } from '@backend/pdf/pdf.module'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    HealthModule,
    TemplateModule,
    PdfModule,
    VariableModule,
  ],
})
export class AppModule { }
