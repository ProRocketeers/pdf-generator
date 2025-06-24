import { Migration } from '@mikro-orm/migrations';

export class Migration20250624090816 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "template" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "description" varchar(255) not null, "template_url" varchar(255) not null, "template_type" text check ("template_type" in ('adocx', 'html')) not null, "image_url" varchar(255) not null, constraint "template_pkey" primary key ("id"));`);

    this.addSql(`create table "variable" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "type" text check ("type" in ('string')) not null default 'string', "title" varchar(255) not null, "default" varchar(255) null, "template_id" varchar(255) not null, constraint "variable_pkey" primary key ("id"));`);

    this.addSql(`alter table "variable" add constraint "variable_template_id_foreign" foreign key ("template_id") references "template" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "variable" drop constraint "variable_template_id_foreign";`);

    this.addSql(`drop table if exists "template" cascade;`);

    this.addSql(`drop table if exists "variable" cascade;`);
  }

}
