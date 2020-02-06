import axiosMock from 'axios';
import configureMockStore from 'redux-mock-store';

import { ApiMetaType } from '~/shared/types/MiddlewareTypes';

import apiMiddleware from '~/store/config/middlewares/apiMiddleware';

import fetchProducts from './fetchProducts';

const products = [
  {
    _id: '5cc2def690118411e1311e92',
    name: 'Nike Air Jordan',
    image:
      'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg',
    imageHovered:
      'https://static.street-beat.ru/upload/resize_cache/iblock/fd4/450_450_1/fd4bc310bdf1e7abfc063712bcf54da7.jpg',
    description: 'loorem ipsum solor it samet neque porro',
    price: 8700,
    stock: 4,
    shop: 'Cool Shop',
    user: '5cc2ddd390118411e1311e90',
  },
  {
    _id: '5cc2df4790118411e1311e93',
    name: 'Nike Air Force',
    image:
      'https://static.street-beat.ru/upload/resize_cache/iblock/eb6/450_450_1/eb6ec30273831a8a938eb99f5b69c9ff.jpg',
    imageHovered:
      'https://static.street-beat.ru/upload/resize_cache/iblock/304/450_450_1/3044b7962e9b208a06c9f4dd6618b19b.jpg',
    description: 'loorem ipsum solor it samet neque porro',
    price: 7400,
    stock: 7,
    shop: 'Another Shop',
    user: '5cc2ddd390118411e1311e90',
  },
];

const response = { data: { products } };
const error = { message: 'Request failed with status code 404' };

const mockStore = configureMockStore([apiMiddleware]);
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeStore = (initialState = []) => mockStore(() => ({ products: initialState }));

let action = { meta: {} as ApiMetaType };

beforeEach(() => {
  axiosMock.mockRestore();
});

afterAll(() => {
  action.meta.callAPI.mockRestore();
  action.meta.shouldCallAPI.mockRestore();
});

describe('fetchProducts', () => {
  it('should SUCCESS products retrieval', async () => {
    axiosMock.get.mockReturnValue(Promise.resolve(response));
    const store = makeStore();
    action = fetchProducts('/products');
    jest.spyOn(action.meta, 'callAPI');
    jest.spyOn(action.meta, 'shouldCallAPI');

    await store.dispatch(action);

    expect(action.meta.callAPI).toHaveBeenCalledTimes(1);
    expect(action.meta.shouldCallAPI).toHaveBeenCalledTimes(1);
    const expectedActions = [
      { type: 'PRODUCTS/GET_PRODUCTS_REQUEST', payload: {} },
      {
        type: 'PRODUCTS/GET_PRODUCTS_SUCCESS',
        payload: { response },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  // eslint-disable-next-line prettier/prettier
  it('should not hit API if there\'s products already', async () => {
    axiosMock.get.mockReturnValue(Promise.resolve(response));
    const store = makeStore(products);
    action = fetchProducts('/products');

    jest.spyOn(action.meta, 'callAPI');
    jest.spyOn(action.meta, 'shouldCallAPI');

    await store.dispatch(action);

    expect(action.meta.callAPI).not.toHaveBeenCalled();
    expect(action.meta.shouldCallAPI).toHaveBeenCalledTimes(1);
    expect(store.getActions()).toEqual([]);
  });

  it('should FAIL products retrieval', async () => {
    axiosMock.get.mockReturnValue(Promise.reject(error));
    const store = makeStore();
    action = fetchProducts('/products-bad-url');

    jest.spyOn(action.meta, 'callAPI');
    jest.spyOn(action.meta, 'shouldCallAPI');

    await store.dispatch(action);

    expect(action.meta.callAPI).toHaveBeenCalledTimes(1);
    expect(action.meta.shouldCallAPI).toHaveBeenCalledTimes(1);
    const expectedActions = [
      { type: 'PRODUCTS/GET_PRODUCTS_REQUEST', payload: {} },
      {
        type: 'PRODUCTS/GET_PRODUCTS_FAILURE',
        payload: {
          error: {
            message: 'Request failed with status code 404',
          },
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
