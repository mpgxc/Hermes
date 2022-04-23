import { EntityId } from './entity-id';

abstract class Entity<T = unknown> {
  protected readonly _id: string;
  protected readonly _props: T;

  constructor(props: T, id?: string) {
    this._props = props;
    this._id = id || EntityId.build();
  }

  get id(): string {
    return this._id;
  }
}

export { Entity };
