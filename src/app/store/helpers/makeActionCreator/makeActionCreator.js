// @flow strict
export type ActionType = {
  type: string,
};

type ActionCreatorType = <T>(T | Array<T>) => ActionType;

function makeActionCreator(type: string, ...argNames: Array<string>): ActionCreatorType {
  return function actionCreator(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export default makeActionCreator;
