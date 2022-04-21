import { Entity, Maybe } from '../logic';
import { IMapper } from './mapper.interface';
import { IWriteRepository, IReadRepository } from './repository.interface';

abstract class BaseAbstractRepository<E extends Entity, Response>
  implements IWriteRepository<E>, IReadRepository<E, Response>
{
  constructor(
    protected readonly repository: any,
    protected readonly mapper: IMapper,
  ) {}

  async list(): Promise<Maybe<Array<Response>>> {
    const data = await this.repository.findMany();

    return data.length ? data.map(this.mapper.toRender) : null;
  }

  async findById(id: string): Promise<Maybe<E>> {
    const data = await this.repository.findUnique({
      where: { id },
    });

    return data ? this.mapper.toDomain(data) : null;
  }

  async findByIdRender(id: string): Promise<Maybe<Response>> {
    const data = await this.repository.findUnique({
      where: { id },
    });

    return data ? (this.mapper.toRender(data) as Response) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({
      where: { id },
    });
  }

  async update(item: E): Promise<void> {
    await this.repository.update({
      where: { id: item.id },
      data: item,
    });
  }
}

export { BaseAbstractRepository };
