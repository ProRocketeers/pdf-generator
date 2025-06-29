import { Template } from '@backend/template/template.entity';
import { TemplateType } from '@backend/template/templateType.enum';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TemplateSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const template1 = new Template();

    template1.title = 'Invoice';
    template1.description = 'Description of Template 1';
    template1.templateType = TemplateType.Adoc;
    template1.templateUrl = 'https://example.com/template.adoc';
    template1.imageUrl = 'https://example.com/template.png';

    context.template1 = template1;

    em.persist(template1);

    const template2 = new Template();

    template2.title = 'Invoice html';
    template2.description = 'Description of Template 2';
    template2.templateType = TemplateType.Html;
    template2.templateUrl = 'https://example.com/template.html';
    template2.imageUrl = 'https://example.com/template.png';

    context.template2 = template2;

    em.persist(template2);

    await em.flush();
  }
}
