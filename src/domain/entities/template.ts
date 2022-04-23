import { Entity } from 'commons/domain';
import { Maybe } from 'commons/logic';

import { Message } from './message';

type TemplateProps = {
  slug: string;
  title: string;
  subject: string;
  is_active?: boolean;
  is_default?: boolean;
  description?: string;
  template_url: string;
  messages?: Array<Message>;
};

class Template extends Entity<TemplateProps> {
  get title(): string {
    return this._props.title;
  }

  get slug(): string {
    return this._props.slug;
  }

  get is_active(): boolean {
    return this._props.is_active;
  }

  get is_default(): boolean {
    return this._props.is_default;
  }

  get description(): Maybe<string> {
    return this._props.description;
  }

  get template_url(): string {
    return this._props.template_url;
  }

  get subject(): string {
    return this._props.subject;
  }

  get messages(): Array<Message> {
    return this._props.messages;
  }

  set messages(messages: Array<Message>) {
    this._props.messages.push(...messages);
  }

  public setTitle(title: string) {
    this._props.title = title;

    return this;
  }

  public setSlug(slug: string) {
    this._props.slug = slug;

    return this;
  }

  public setTemplateURL(url: string) {
    this._props.template_url = url;

    return this;
  }

  public setDescription(desc: string) {
    this._props.description = desc;

    return this;
  }

  public setDefault() {
    this._props.is_default = true;

    return this;
  }

  public unsetDefault() {
    this._props.is_default = false;

    return this;
  }

  public setActive() {
    this._props.is_active = true;

    return this;
  }

  public unsetActive() {
    this._props.is_active = false;

    return this;
  }

  private constructor(props: TemplateProps, id?: string) {
    super(props, id);
  }

  static build(props: TemplateProps, id?: string): Template {
    const instance = new this(props, id);

    return instance.setActive().unsetDefault();
  }
}

export { Template, TemplateProps };
