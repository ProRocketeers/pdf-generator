import { Variable } from '@backend/template/variable.entity'
import { VariableType } from '@backend/template/variableType.enum'
import type { Dictionary, EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

export class VariableSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    // Variables for template01
    const template01AmountVar = new Variable()
    template01AmountVar.name = 'amount'
    template01AmountVar.type = VariableType.String
    template01AmountVar.title = 'Amount'
    template01AmountVar.default = '104.00'
    template01AmountVar.template = context.template01
    em.persist(template01AmountVar)

    const template01CurrencyVar = new Variable()
    template01CurrencyVar.name = 'currency'
    template01CurrencyVar.type = VariableType.String
    template01CurrencyVar.title = 'Currency'
    template01CurrencyVar.default = 'EUR'
    template01CurrencyVar.template = context.template01
    em.persist(template01CurrencyVar)

    const template01DateVar = new Variable()
    template01DateVar.name = 'date'
    template01DateVar.type = VariableType.String
    template01DateVar.title = 'Date'
    template01DateVar.default = '2025-05-04'
    template01DateVar.template = context.template01
    em.persist(template01DateVar)

    const template01NameVar = new Variable()
    template01NameVar.name = 'name'
    template01NameVar.type = VariableType.String
    template01NameVar.title = 'Name'
    template01NameVar.default = 'John Doe'
    template01NameVar.template = context.template01
    em.persist(template01NameVar)

    const template01ReferenceVar = new Variable()
    template01ReferenceVar.name = 'reference'
    template01ReferenceVar.type = VariableType.String
    template01ReferenceVar.title = 'Reference'
    template01ReferenceVar.default = 'ABC123'
    template01ReferenceVar.template = context.template01
    em.persist(template01ReferenceVar)

    // Variables for template02
    const template02AmountVar = new Variable()
    template02AmountVar.name = 'amount'
    template02AmountVar.type = VariableType.String
    template02AmountVar.title = 'Amount'
    template02AmountVar.template = context.template02
    em.persist(template02AmountVar)

    const template02CurrencyVar = new Variable()
    template02CurrencyVar.name = 'currency'
    template02CurrencyVar.type = VariableType.String
    template02CurrencyVar.title = 'Currency'
    template02CurrencyVar.template = context.template02
    em.persist(template02CurrencyVar)

    const template02DateVar = new Variable()
    template02DateVar.name = 'date'
    template02DateVar.type = VariableType.String
    template02DateVar.title = 'Date'
    template02DateVar.template = context.template02
    em.persist(template02DateVar)

    const template02NameVar = new Variable()
    template02NameVar.name = 'name'
    template02NameVar.type = VariableType.String
    template02NameVar.title = 'Name'
    template02NameVar.template = context.template02
    em.persist(template02NameVar)

    const template02ReferenceVar = new Variable()
    template02ReferenceVar.name = 'reference'
    template02ReferenceVar.type = VariableType.String
    template02ReferenceVar.title = 'Reference'
    template02ReferenceVar.template = context.template02
    em.persist(template02ReferenceVar)

    // Variables for template1
    const template1FullNameVar = new Variable()
    template1FullNameVar.name = 'fullName'
    template1FullNameVar.type = VariableType.String
    template1FullNameVar.title = 'Full Name'
    template1FullNameVar.default = 'John Doe'
    template1FullNameVar.template = context.template1
    em.persist(template1FullNameVar)

    const template1OccupationVar = new Variable()
    template1OccupationVar.name = 'occupation'
    template1OccupationVar.type = VariableType.String
    template1OccupationVar.title = 'Occupation'
    template1OccupationVar.default = 'developer'
    template1OccupationVar.template = context.template1
    em.persist(template1OccupationVar)

    // Variables for template2
    const template2FullNameVar = new Variable()
    template2FullNameVar.name = 'fullName'
    template2FullNameVar.type = VariableType.String
    template2FullNameVar.title = 'Full Name'
    template2FullNameVar.default = 'John Doe'
    template2FullNameVar.template = context.template2
    em.persist(template2FullNameVar)

    const template2OccupationVar = new Variable()
    template2OccupationVar.name = 'occupation'
    template2OccupationVar.type = VariableType.String
    template2OccupationVar.title = 'Occupation'
    template2OccupationVar.default = 'developer'
    template2OccupationVar.template = context.template2
    em.persist(template2OccupationVar)

    await em.flush()
  }
}
