import createReducer from './createReducer';

describe('createReducer', () => {
  type User = { name: string };

  type State = Array<User>;

  type ActionType = {
    type: string;
    user: User;
  };

  const TYPE = 'SOME_TEST_TYPE';

  it('should return a reducer', () => {
    const reducer = createReducer<State, ActionType>([], {
      [TYPE](state, action) {
        return [action.user];
      },
    });
    expect(typeof reducer).toBe('function');
  });
});