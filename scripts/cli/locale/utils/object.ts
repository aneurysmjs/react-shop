import { pick, dissocPath, assocPath, mergeDeepRight, path, lensPath, set } from 'ramda';
import { makePropertyPathTokens } from './pathParser';

export interface JSONObj {
  [K: string]: string | number | boolean | JSONObj;
}

const setProperty = (path: string[], val: PropertyKey | JSONObj, obj: JSONObj) => {
  return set(lensPath(path), val, obj);
};

export const addProperty = (target: JSONObj, propPath: string, value?: PropertyKey | JSONObj) => {
  const tokens = makePropertyPathTokens(propPath);

  let result = structuredClone(target);

  for (const path of tokens) {
    result = setProperty(path, value ?? {}, result);
  }

  return result;
};

export const updateProperty = (obj: JSONObj, propPath: string, value: PropertyKey | JSONObj) => {
  return addProperty(obj, propPath, value);
};

export const removeProperty = (target: JSONObj, propPath: string) => {
  const tokens = makePropertyPathTokens(propPath);

  let result = target;

  for (const path of tokens) {
    result = dissocPath<JSONObj>(path, result);
  }

  return result;
};

export const moveProperty = (obj: JSONObj, sourcePath: string, destinationPath: string) => {
  const source = sourcePath.includes('.') ? sourcePath.split('.') : [sourcePath];

  const destination = destinationPath.includes('.')
    ? destinationPath.split('.')
    : [destinationPath];

  const objectWithoutSource = dissocPath(source, obj);
  const removedValue = pick(source, obj);

  const destinationValue = path<JSONObj>(destination, objectWithoutSource);

  if (destinationValue === undefined) {
    throw new Error(`Destination path "${destinationPath}" not found in the object.`);
  }

  return assocPath(
    destination,
    mergeDeepRight(destinationValue, removedValue),
    objectWithoutSource,
  ) as JSONObj;
};

// type NestedArray<T> = T | NestedArray<T>[];
//
// const parseString = (str: string): NestedArray<string> => {
//   const index = stindexOf('+');
//   if (index === -1) {
//     return [str];
//   } else {
//     return [stslice(0, index), parseString(stslice(index + 1))];
//   }
// };

// const source = { a: { b: { c: 'yeah' } } };

// const fullPath = ['a', 'b', 'c'];

// const deepPick = (fullPath, target) => {
//   const dropped = dropLast(1, fullPath);
//   const modified = path(dropped, target);

//   return pick(last(fullPath), modified);
// };

// deepPick(fullPath, source);
