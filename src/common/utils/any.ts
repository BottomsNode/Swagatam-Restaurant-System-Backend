import { isEmpty, isNil, isString, isObjectLike } from "lodash";

export const isNilOrEmpty = (value): boolean =>
  isNil(value) || ((isObjectLike(value) || isString(value)) && isEmpty(value));
