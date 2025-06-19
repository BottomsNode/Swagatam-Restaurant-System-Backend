export interface IPageable<T> {
  items: T[];
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  statusCounts?: Record<string, number>;
}
