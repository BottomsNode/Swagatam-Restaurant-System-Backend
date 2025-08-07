import { isEmpty, isNil, isString, isObjectLike } from 'lodash';

export const isNilOrEmpty = (value): boolean =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  isNil(value) || ((isObjectLike(value) || isString(value)) && isEmpty(value));
