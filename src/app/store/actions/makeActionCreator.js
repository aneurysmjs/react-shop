// @flow strict
type ActionType = {
  type: string,
};

export default function makeActionCreator(type: string, ...argNames: Array<string>): <T>(Array<T>) => ActionType {

  return function actionCreator(...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;

  };

}