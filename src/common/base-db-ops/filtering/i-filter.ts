import { EOrder } from "./e-order";

export interface IFilterBase<TId = string> {
  $ids?: TId[];
  $orderBy?: string;
  $order?: EOrder;
}

export interface IPageableFilterBase<TId = string> extends IFilterBase<TId> {
  $page?: number;
  $perPage?: number;
}

export interface IResolvableUrl {
  $resolveImages?: boolean;
}

export type Filter<T, TId = string> = Partial<T & IFilterBase<TId>>;
export type PageableFilter<T, TId = string> = Partial<T & IPageableFilterBase<TId>>;
