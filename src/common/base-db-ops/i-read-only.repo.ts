import { Filter, PageableFilter, IPageable } from "./filtering";

export interface IReadOnlyRepo<T, TKey, TPageableFilter = PageableFilter<T, TKey>, TFilter = Filter<T, TKey>> {
  getAsync(pk: TKey): Promise<T>;
  allAsync(filter?: TFilter): Promise<T[]>;
  pagedAsync(filter?: TPageableFilter): Promise<IPageable<T>>;
  countAsync(filterObj?: TFilter): Promise<number>;
  existAsync(filterObj?: TFilter | Filter<T, TKey>): Promise<boolean>;
}
