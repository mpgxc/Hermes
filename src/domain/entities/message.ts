import { AggregateRoot } from 'commons/domain';

import { Recipient } from './recipient';
import { Template } from './template';

type MessageProps = {
  template: Template;
  recipients: Array<Recipient>;
  sendDate?: Date;
};

class Message extends AggregateRoot<MessageProps> {
  get template(): Template {
    return this._props.template;
  }

  get recipients(): Array<Recipient> {
    return this._props.recipients;
  }

  get sendDate(): Date {
    return this._props.sendDate;
  }

  private constructor(props: MessageProps, id?: string) {
    super(props, id);
  }

  static build(props: MessageProps, id?: string): Message {
    const instance = new this(props, id);

    instance._props.sendDate = new Date();

    return instance;
  }
}

export { Message };
