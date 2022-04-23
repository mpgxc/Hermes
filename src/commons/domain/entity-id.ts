import { v4 as uuid, validate } from 'uuid';

class EntityId {
  static build(): string {
    return uuid();
  }

  static validate(id: string): boolean {
    return validate(id);
  }
}

export { EntityId };
