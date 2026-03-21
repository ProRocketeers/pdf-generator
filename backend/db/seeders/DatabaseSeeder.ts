import { TemplateSeeder } from 'db/seeders/TemplateSeeder';
import { VariableSeeder } from 'db/seeders/VariableSeeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(entityManager: EntityManager): Promise<void> {
    return this.call(entityManager, [TemplateSeeder, VariableSeeder]);
  }
}
