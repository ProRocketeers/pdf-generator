import { GetTemplateListService } from '@backend/template/getTemplateList.service';
import { TemplateController } from '@backend/template/template.controller';
import { Template } from '@backend/template/template.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [GetTemplateListService],
})
export class TemplateModule {}
