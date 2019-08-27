/* eslint-disable no-console */
import { createStore } from 'redux';

import logger from './logger';

jest.spyOn(console, 'group');
jest.spyOn(console, 'log');
jest.spyOn(console, 'groupEnd');

let store;
let nextHandler;
beforeEach(() => {
  store = createStore(() => ({ name: 'Some state' }));
  store.dispatch = jest.fn(store.dispatch);
  nextHandler = logger(store);
});

afterAll(() => {
  console.group.mockRestore();
  console.log.mockRestore();
  console.groupEnd.mockRestore();
});

describe('logger middleware', () => {
  it('must return a function to handle next', () => {
    expect(nextHandler).toBeInstanceOf(Function);
    expect(nextHandler.length).toEqual(1);
  });

  describe('handle next', () => {
    it('must return a function to handle action', () => {
      const actionHandler = nextHandler();
      expect(actionHandler).toBeInstanceOf(Function);
      expect(actionHandler.length).toEqual(1);
    });

    describe('handle action', () => {
      it('should call console.(group/log/groupEnd) when dispatching action', () => {
        const action = {
          type: 'TEST_ACTION',
        };
        const dispatch = jest.fn(() => {});
        const actionHandler = nextHandler(dispatch);
        
        actionHandler(action);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(console.group).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledTimes(3);
        expect(console.groupEnd).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toMatchObject(action);
      });
    });
  });
});
