// @flow strict
export type ActionType = {
  type: string,
};

type ActionCreatorType = <T>(T | Array<T>) => ActionType;

function makeActionCreator(type: string, ...argNames: Array<string>): ActionCreatorType {
  return function actionCreator(...args) {
    const action = { type };
    return argNames.reduce((current, arg, index) => {
      const currentAction = {
        ...current,
        payload: {
          [argNames[index]]: args[index],
        },
      };
      return currentAction;
    }, action);
  };
}

export default makeActionCreator;
