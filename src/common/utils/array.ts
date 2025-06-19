import {
    difference as baseDifference,
    Comparator,
    differenceWith
} from "lodash";



export const difference = <T>(array: T[], other: T[], comparator?: Comparator<T>): T[] => {
  if (comparator == null) {
    return baseDifference(array, other);
  }
  return differenceWith(array, other, comparator);
};