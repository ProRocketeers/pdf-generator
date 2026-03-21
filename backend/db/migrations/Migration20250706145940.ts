import { Migration } from '@mikro-orm/migrations';

export class Migration20250706145940 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "template" drop constraint if exists "template_template_type_check";`);

    this.addSql(`alter table "template" add constraint "template_template_type_check" check("template_type" in ('adoc', 'html', 'pdf'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "template" drop constraint if exists "template_template_type_check";`);

    this.addSql(`alter table "template" add constraint "template_template_type_check" check("template_type" in ('adoc', 'html'));`);
  }

}
