import { Entity } from 'commons/logic';

interface IMapper<T extends Entity = any, Response = unknown> {
  toPersistence(data: T): Partial<Response>;

  toDomain(data: Response): T;

  toRender(data: Response): Partial<Response>;
}

export { IMapper };
