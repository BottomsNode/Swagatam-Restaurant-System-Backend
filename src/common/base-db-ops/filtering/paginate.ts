import { skip, take } from '../utils';
import { IPageable } from './i-pageable';

export const countPages = (count: number, perPage = 20): number =>
  Math.floor(count / perPage) + (count % perPage > 0 ? 1 : 0);

export const paginateArray = <T>(source: T[], page = 1, perPage = 20): IPageable<T> => {
  const chunkIndex = page - 1;
  const items = take(skip(source, chunkIndex * perPage), perPage);
  const totalCount = source.length;
  const totalPages = countPages(totalCount, perPage);
  return { items, page, perPage, totalCount, totalPages };
};
