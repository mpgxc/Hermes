import { Entity } from 'commons/domain';

import { Message } from './message';

type RecipientProps = {
  name: string;
  address: string;
  message?: Message;
};

class Recipient extends Entity<RecipientProps> {
  get name(): string {
    return this._props.name;
  }

  get address(): string {
    return this._props.address;
  }

  get message(): Message {
    return this._props.message;
  }

  private constructor(props: RecipientProps, id?: string) {
    super(props, id);
  }

  static build(props: RecipientProps, id?: string): Recipient {
    return new this(props, id);
  }
}

export { Recipient };
