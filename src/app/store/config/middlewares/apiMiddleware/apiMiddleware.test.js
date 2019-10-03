import axiosMock from 'axios';
import { createStore } from 'redux';

import apiMiddleware from './apiMiddleware';

const items = [
  {
    id: '5cc2def690118411e1311e92',
    name: 'some fake name',
  },
  {
    id: '5cc2df4790118411e1311e93',
    name: 'another fake name',
  },
];

const response = { data: items };
const error = { message: 'Request failed with status code 404' };

const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const requestTypes = [REQUEST, SUCCESS, FAILURE];

const reducer = () => {};

let store;
let nextHandler;
beforeEach(() => {
  /**
   * @link https://gist.github.com/iamdey/71528fd155d10099d0bb0e4a56d2b558
   */
  store = createStore(reducer);
  store.dispatch = jest.fn(store.dispatch);
  nextHandler = apiMiddleware(store);
  axiosMock.mockRestore();
});

describe('api middleware', () => {
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
      it('should call next when is a \'normal\' action', () => {
        const actionObj = {
          callAPI: () => {},
        };
        const dispatch = jest.fn(() => {});
        const actionHandler = nextHandler(dispatch);

        actionHandler(actionObj);
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toMatchObject(actionObj);
      });

      it('should throw when \'types\' property is not correct', () => {
        const actionObj = {
          meta: {
            types: [],
            callAPI: () => {},
          },
        };

        const actionHandler = nextHandler(() => {});

        expect(() => {
          actionHandler(actionObj);
        }).toThrowError('Expected an array of three string types.');
      });

      it('should throw when there\'s no \'callAPI\' property', () => {
        const actionObj = {
          meta: {
            types: requestTypes,
          },
        };

        const actionHandler = nextHandler();

        expect(() => {
          actionHandler(actionObj);
        }).toThrowError('Expected callAPI to be a function.');
      });

      it('should \'success\' the API call', async () => {
        axiosMock.get.mockReturnValue(Promise.resolve(response));
        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => axiosMock.get('someApiEndpoint')),
          },
        };
        const actionHandler = nextHandler();

        await actionHandler(actionObj);

        // The first argument of the first call is a REQUEST
        expect(store.dispatch.mock.calls[0][0]).toMatchObject({ type: REQUEST });
        // callAPI should been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(1);
        // check that was called with the right endpoint
        expect(axiosMock.get).toHaveBeenCalledWith('someApiEndpoint');
        // The first argument of the second call is a SUCCESS
        expect(store.dispatch.mock.calls[1][0]).toMatchObject({ type: SUCCESS, payload: { response } });
      });

      it('should \'fail\' the API call', async () => {
        axiosMock.get.mockReturnValue(Promise.reject(error));
        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => axiosMock.get('someBadApiEndpoint')),
          },
        };
        const actionHandler = nextHandler();

        await actionHandler(actionObj);

        // The first argument of the first call is a REQUEST
        expect(store.dispatch.mock.calls[0][0]).toMatchObject({ type: REQUEST });
        // callAPI should been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(1);
        // check that was called with the right endpoint
        expect(axiosMock.get).toHaveBeenCalledWith('someBadApiEndpoint');
        // The first argument of the second call is a FAILURE
        // eslint-disable-next-line max-len
        expect(store.dispatch.mock.calls[1][0]).toMatchObject({ type: FAILURE, payload: { error } });
      });

      it('should NOT call the API', async () => {
        axiosMock.get.mockReturnValue(Promise.resolve(response));
        const actionObj = {
          meta: {
            types: requestTypes,
            callAPI: jest.fn(() => axiosMock.get('endpoint')),
            shouldCallAPI: () => false,
          },
        };
        const actionHandler = nextHandler();

        await actionHandler(actionObj);

        expect(store.dispatch).not.toHaveBeenCalled();
        // callAPI should NOT been called
        expect(actionObj.meta.callAPI).toHaveBeenCalledTimes(0);
      });
    });
  });
});
