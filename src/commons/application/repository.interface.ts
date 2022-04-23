import { Entity } from 'commons/domain/entity';

import { Maybe } from '../logic';

interface IWriteRepository<E extends Entity> {
  delete(id: string): Promise<void>;

  update(item: E): Promise<void>;
}

interface IReadRepository<E extends Entity, Response> {
  list(): Promise<Maybe<Array<Response>>>;

  findById(id: string): Promise<Maybe<E>>;

  findByIdRender(id: string): Promise<Maybe<Response>>;
}

export { IWriteRepository, IReadRepository };
