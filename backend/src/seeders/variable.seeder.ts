import { Variable } from '@backend/template/variable.entity';
import { VariableType } from '@backend/template/variableType.enum';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';

export class VariableSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const variable1 = new Variable();

    variable1.name = 'fullName';
    variable1.type = VariableType.String;
    variable1.title = 'Full Name';
    variable1.default = 'John Doe';
    variable1.template = context.template1;

    em.persist(variable1);

    const variable2 = new Variable();

    variable2.name = 'occupation';
    variable2.type = VariableType.String;
    variable2.title = 'Occupation';
    variable2.default = 'developer';
    variable2.template = context.template1;

    em.persist(variable2);

    const variable3 = new Variable();

    variable3.name = 'fullName';
    variable3.type = VariableType.String;
    variable3.title = 'Full Name';
    variable3.default = 'John Doe';
    variable3.template = context.template2;

    em.persist(variable3);

    const variable4 = new Variable();

    variable4.name = 'occupation';
    variable4.type = VariableType.String;
    variable4.title = 'Occupation';
    variable4.default = 'developer';
    variable4.template = context.template2;

    em.persist(variable4);

    await em.flush();
  }
}
