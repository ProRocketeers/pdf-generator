import { TemplateSeeder } from '@backend/seeders/template.seeder';
import { VariableSeeder } from '@backend/seeders/variable.seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class DatabaseSeeder extends Seeder {
  async run(entityManager: EntityManager): Promise<void> {
    return this.call(entityManager, [TemplateSeeder, VariableSeeder]);
  }
}
