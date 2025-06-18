import { Migration } from '@mikro-orm/migrations';

export class Migration20250618155227 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "template" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" varchar(255) not null, "template_url" varchar(255) not null, "template_type" varchar(255) not null, "image_url" varchar(255) not null, constraint "template_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "template" cascade;`);
  }
}
