import type { JSONObj } from './object';

export const SIBLING_OPERATOR = '+';
export const PROPERTY_OPERATOR = '.';

/**
 * Regular expression to validate a specific input string format.
 *
 * @pattern /^(?!.*\.\.+)(?!.*\+\+)(?!.*\.$)(?!.*\+\.)[a-zA-Z0-9]+([.+][a-zA-Z0-9]+)*$/
 *
 * @description
 * This regular expression is used to validate strings that follow a specific pattern:
 *
 * 1. **Base identifier**: Starts with one or more alphanumeric characters.
 * 2. **Optional nested dot and plus notation**: Allows additional segments with a `.` or `+`, each followed by alphanumeric characters, to support deep nesting.
 *
 * The regex enforces several constraints to ensure the validity of the input:
 *
 * - No consecutive dots (`..`).
 * - No consecutive plus signs (`++`).
 * - No trailing dot (`.`).
 * - No plus sign followed by a dot (`+.`).
 *
 * @groups
 *
 * - `match[0]`: The entire matched string.
 *
 * @breakdown
 *
 * - `^`: Asserts the start of the string.
 * - `(?!.*\.\.+)`: Negative lookahead to disallow consecutive dots.
 * - `(?!.*\+\+)`: Negative lookahead to disallow consecutive plus signs.
 * - `(?!.*\.$)`: Negative lookahead to disallow a trailing dot.
 * - `(?!.*\+\.)`: Negative lookahead to disallow a plus sign followed by a dot.
 * - `[a-zA-Z0-9]+`: Matches one or more alphanumeric characters (the base identifier).
 * - `([.+][a-zA-Z0-9]+)*`: Allows zero or more occurrences of either a dot or plus,
 *   each followed by alphanumeric characters, supporting deep nesting.
 * - `$`: Asserts the end of the string.
 *
 * @example
 * For the input string `"example.deep+path.with+segments"`, the regex matches:
 *
 * - `match[0]` → `"example.deep+path.with+segments"` (the entire input).
 *
 * For the input `"some"`, the regex matches:
 *
 * - `match[0]` → `"some"` (the entire input).
 */
export const propertyPathRegex =
  // /^(?!.*\.\.+)(?!.*\+\+)(?!.*\.$)(?!.*\+\.)[a-zA-Z0-9]+([.+][a-zA-Z0-9]+)+$/; // this failed with single path: "some"
  /^(?!.*\.\.+)(?!.*\+\+)(?!.*\.$)(?!.*\+\.)[a-zA-Z0-9]+([.+][a-zA-Z0-9]+)*$/;

export const validatePropertyPathWithSiblings = (input: string) => {
  /**
   * @pattern /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\[[a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*\]$/
   *
   * @description
   *
   * Regular expression to validate a string format where the string must end with square brackets
   * containing elements separated by commas. The pattern ensures the string starts with alphanumeric
   * characters and periods (for nested properties), and ends with properly formatted square brackets
   * containing at least one element.
   *
   * @breakdown
   *
   * - `^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*`: Ensures the string starts with one or more alphanumeric characters,
   *   optionally followed by more alphanumeric characters prefixed by periods (nested properties).
   *   This ensures there is no dot immediately before the square brackets.
   * - `\[[a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*\]`:
   *    - `\[` and `\]`: Match literal square brackets.
   *    - `[a-zA-Z0-9]+`: Ensures at least one alphanumeric element inside the brackets.
   *    - `(,\s*[a-zA-Z0-9]+)*`: Matches additional elements inside the brackets, separated by commas,
   *      with optional spaces.
   * - `$`: Anchors the match to the end of the string, ensuring the square bracket section is required.
   *
   * This regular expression will validate strings like:
   * - 'some.deep.nested[a, b]'        -> Valid
   * - 'some.deep.nested[a]'           -> Valid
   * - 'some.deep.nested.prop'         -> Invalid (missing square brackets)
   * - 'some.nested.[a, b]'            -> Invalid (dot immediately before square brackets)
   * - 'some.nested[a'                 -> Invalid (missing closing bracket)
   * - ''                              -> Invalid (empty string)
   *
   * @example
   *
   * 'some.deep.nested[a, b]' // true
   * 'some.deep.nested.prop'  // false
   */
  // const validFormat = /^[a-zA-Z0-9.]+\[[a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*\]$/; // Allows dot immediately before square brackets
  const validFormat = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\[[a-zA-Z0-9]+(,\s*[a-zA-Z0-9]+)*\]$/;

  return validFormat.test(input);
};

export const propertyPathParser = (input: string): [string, JSONObj] => {
  /**
   * Regular expression to match the input string format.
   *
   * @pattern ^(.*?)(\[(.*?)\])$
   *
   * @description
   * This regular expression captures the input string into two parts:
   *
   * 1. **Base string**: Everything before the opening square bracket.
   * 2. **Array part**: The content inside the square brackets.
   *
   * @groups
   *
   * - `match[1]`: The base string (everything before the opening bracket).
   * - `match[3]`: The content inside the brackets (the array part).
   *
   * @breakdown
   *
   * - `^`: Asserts the start of the string.
   * - `(.*?)`: Captures the base string (non-greedy match).
   * - `(\[(.*?)\])`: Captures the array part.
   *   - `\[`: Matches the literal opening square bracket.
   *   - `(.*?)`: Captures the content inside the brackets (non-greedy match).
   *   - `\]`: Matches the literal closing square bracket.
   * - `$`: Asserts the end of the string.
   *
   * @example
   * For the input string `"some.path[a,b]"`, the regex matches:
   *
   * - `match[1]` → `"some.path"` (everything before the `[`).
   * - `match[3]` → `"a,b"` (the content inside the brackets).
   */
  const regex = /^(.*?)(\[(.*?)\])$/;
  const match = regex.exec(input);

  if (match) {
    // Extract the base string and the array part
    const baseString = match[1]; // the part before the brackets
    // const siblings = match[3].split(',').map((item) => item.trim()); // the part inside the brackets, split by comma
    const siblings = match[3].split(',').reduce<JSONObj>((obj, key) => {
      const trimmedKey = key.trim();

      obj[trimmedKey] = {};

      return obj;
    }, {});

    return [baseString, siblings]; // return as an array
  } else {
    throw new Error('Input format is incorrect');
  }
};

export const makePropertyPath = (path: string) => path.split(PROPERTY_OPERATOR);

export const makePropertyPathTokens = (path: string) => {
  if (!isValidPropertyPath(path)) {
    throw new Error('Invalid property path format');
  }

  return path.split(SIBLING_OPERATOR).map(makePropertyPath);
};

/**
 * Validates the format of the input string based on specified rules.
 *
 * The valid formats include:
 * - "some+prop"
 * - "some.prop"
 * - "some.nested+prop"
 * - "some+prop.nested"
 * - "some+prop.nested+continue.with.other"
 *
 * The invalid formats include:
 * - "some."
 * - "some.nested+"
 * - "some.nested+other."
 * - "some.nested+other+"
 *
 * @param {string} input - The input string to validate.
 * @returns {boolean} - Returns true if the format is valid, otherwise false.
 *
 */
export const isValidPropertyPath = (input: string) => {
  return propertyPathRegex.test(input);
};

export const propertyPathWithSiblings = (input: string): string[] => {
  if (isValidPropertyPath(input)) {
    // Split the input string by the '+' character
    const tokens = input.split(SIBLING_OPERATOR);

    return tokens;
  }

  return [input];
};

// type NestedArray<T> = T | NestedArray<T>[];
//
// const parseString = (str: string): NestedArray<string> => {
//   const index = str.indexOf('+');
//   if (index === -1) {
//     return [str];
//   } else {
//     return [str.slice(0, index), parseString(str.slice(index + 1))];
//   }
// };

// const source = { a: { b: { c: 'yeah' } } };

// const fullPath = ['a', 'b', 'c'];

// const deepPick = (fullPath, target) => {
//   const dropped = R.dropLast(1, fullPath);
//   const modified = R.path(dropped, target);

//   return R.pick(R.last(fullPath), modified);
// };

// deepPick(fullPath, source);
