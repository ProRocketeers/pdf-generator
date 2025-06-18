import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

export abstract class EntityBase {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
