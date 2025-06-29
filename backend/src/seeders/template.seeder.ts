import { Template } from '@backend/template/template.entity';
import { TemplateType } from '@backend/template/templateType.enum';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class TemplateSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const template01 = new Template();

    template01.title = 'Payment Receipt';
    template01.description = 'Description of PDF Template';
    template01.templateType = TemplateType.Adoc;
    template01.templateUrl = 'https://drive.google.com/uc?export=download&id=1qZS9uxSwsrHSMudfpDTbWQHBIM5vOnrF';
    template01.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png';

    context.template01 = template01;

    em.persist(template01);

    const template02 = new Template();

    template02.title = 'Payment Receipt HTML';
    template02.description = 'Description of PDF Template';
    template02.templateType = TemplateType.Html;
    template02.templateUrl = 'https://drive.google.com/uc?export=download&id=16oauTQqVnJtJEl8unMYyUpH6BILRS97C';
    template02.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png';

    context.template02 = template02;

    em.persist(template02);

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
