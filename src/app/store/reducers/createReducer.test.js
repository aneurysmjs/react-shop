// @flow strict
import createReducer from './createReducer';

describe('createReducer', () => {
  const initialState = [];
  const TYPE = 'SOME_TEST_TYPE';
  // const testAction = { type: TYPE, user: { name: 'Jero' } };

  it('should return a reducer', () => {
    const reducer = createReducer(initialState, {
      [TYPE](state, action) {
        return [...state, action.user];
      }
    });    
    expect(typeof reducer).toBe('function');
  });

});
