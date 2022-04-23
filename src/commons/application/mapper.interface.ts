import { Entity } from 'commons/domain/entity';

interface IMapper<T extends Entity, Response> {
  toPersistence(data: T): Response;

  toDomain(data: Response): T;

  toRender(data: Response): Partial<Response>;
}

export { IMapper };
