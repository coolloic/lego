import { DataSet } from '../mock/dataset';
import { Repository } from '../interfaces/repository';

export class BasicRepository<T, R> implements Repository<T, R> {
  constructor(private readonly dataSet: DataSet<T, R>) {}

  delete(pk: string): R {
    return this.dataSet.delete(pk);
  }

  list(): R {
    return this.dataSet.list();
  }

  put(item: T, pk: string, id: string | number): R {
    return this.dataSet.put(item, pk, id);
  }
}
