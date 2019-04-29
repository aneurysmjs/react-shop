/**
 * @module actions/makeActionCreator
 */

type ActionType = {
  type: string,
};

export default function makeActionCreator<T>(type: string, ...argNames: Array<T>): (Array<T>) => ActionType {

  return function (...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;

  };

}