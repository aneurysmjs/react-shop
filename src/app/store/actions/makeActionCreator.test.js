// @flow strict
import makeActionCreator from './makeActionCreator';

describe('makeActionCreator', () => {
  const GET_INFO = 'GET_INFO';

  it('should return an action creator', () => {
    const actionCreation = makeActionCreator(GET_INFO, 'user');
    expect(typeof actionCreation).toBe('function');
  });

  it('should return an action when calling the action creator', () => {
    const actionCreation = makeActionCreator(GET_INFO, 'user');
    const action = actionCreation({ name: 'Jero' });
    expect(action).toEqual(expect.objectContaining({ type: GET_INFO }));
  });
});
