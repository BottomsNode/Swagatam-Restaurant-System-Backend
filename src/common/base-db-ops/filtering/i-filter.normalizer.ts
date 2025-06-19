import { Filter, PageableFilter } from "./i-filter";

export interface IFilterNormalizer<T, TId = string> {
  normalize(filter: Filter<T, TId>): Filter<T, TId>;
  pageableNormalize(filter: PageableFilter<T, TId>): PageableFilter<T, TId>;
} 