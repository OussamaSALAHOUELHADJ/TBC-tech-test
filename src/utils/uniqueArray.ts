import _ from 'lodash';

export function uniqueArray<T>(array: T[]): T[] {
  return _.uniq(array);
}
