export abstract class IGenericRepository<T, U> {
  abstract find(param?: U): Promise<T[]>;

  abstract findOne(param: U): Promise<T>;

  abstract create(item: Partial<T>): Promise<T>;

  abstract findOneAndUpdate(param: U, item: unknown);
}
