export interface Repository<T, R> {
  list(): R;

  put(item: T, pk: string, id: string | number): R;

  delete(pk: string): R;
}
