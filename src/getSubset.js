/**
 * @description
 * getSubset returns an object with the same structure as the original object passed in,
 * but contains only the specified keys and only if that key has a truth-y value.
 *
 * @param {Object} obj The object from which to create a subset.
 * @param {String[]} paths An array of (top-level) keys that should be included in the subset.
 *
 * @return {Object} An object that contains the specified keys with truth-y values
 */

import { getPropertyByPath, setPropertyByPath } from './util/syncPropertyByPath'


export default function getSubset(obj, paths) {
  let subset = {};

  paths.forEach(path => {
    const pathArr = path.split('.');
    const value = getPropertyByPath(obj, pathArr);
    if (value) {
        setPropertyByPath(subset, pathArr, value)
    }
  });

  return subset;
}
