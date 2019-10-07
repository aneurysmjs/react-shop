import makeActionCreator from './makeActionCreator';

describe('makeActionCreator', () => {
  const GET_INFO = 'GET_INFO';
  const payload = { user: { name: 'Jero' } };

  type Payload = typeof payload;

  it('should return an action creator', () => {
    const actionCreator = makeActionCreator(GET_INFO);
    expect(typeof actionCreator).toBe('function');
  });

  it('should return an action when calling the action creator', () => {
    const actionCreator = makeActionCreator(GET_INFO);
    const action = actionCreator<Payload>(payload);
    expect(action).toEqual(expect.objectContaining({ type: GET_INFO }));
  });

  it('should contain action\'s data under "payload" property', () => {
    const actionCreator = makeActionCreator(GET_INFO);
    const action = actionCreator<Payload>(payload);
    const expectedData = { type: GET_INFO, payload };
    expect(action).toHaveProperty('payload');
    expect(action).toEqual(expectedData);
  });

  it('can contain optional "meta" property and its metadata', () => {
    const actionCreator = makeActionCreator(GET_INFO);
    const meta = { callMe: 'some metada for any purpose' };
    const action = actionCreator(payload, meta);
    const expectedData = { type: GET_INFO, payload, meta };
    expect(action).toHaveProperty('meta');
    expect(action).toEqual(expectedData);
  });
});
