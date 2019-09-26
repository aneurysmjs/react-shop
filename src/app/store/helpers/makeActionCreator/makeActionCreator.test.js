// @flow strict
import makeActionCreator from './makeActionCreator';

describe('makeActionCreator', () => {
  const GET_INFO = 'GET_INFO';
  const name = { name: 'Jero' };

  it('should return an action creator', () => {
    const actionCreator = makeActionCreator(GET_INFO, 'user');
    expect(typeof actionCreator).toBe('function');
  });

  it('should return an action when calling the action creator', () => {
    const actionCreator = makeActionCreator(GET_INFO, 'user');
    const action = actionCreator(name);
    expect(action).toEqual(expect.objectContaining({ type: GET_INFO }));
  });

  it('should contain action\'s data under "payload" property', () => {
    const actionCreator = makeActionCreator(GET_INFO, 'user');
    const action = actionCreator(name);
    const payload = { user: name };
    const expectedData = { type: GET_INFO, payload };
    expect(action).toHaveProperty('payload');
    expect(action).toEqual(expectedData);
  });
});
