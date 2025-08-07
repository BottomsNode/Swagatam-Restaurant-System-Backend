import {
  difference as baseDifference,
  Comparator,
  differenceWith,
} from 'lodash';

export const difference = <T>(
  array: T[],
  other: T[],
  comparator?: Comparator<T>,
): T[] => {
  if (comparator == null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return baseDifference(array, other);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return differenceWith(array, other, comparator);
};
