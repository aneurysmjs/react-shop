import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  ProductsType,
  ProductActionType,
} from '~/store/modules/products/types';

const initialState = {
  error: null,
  isLoading: false,
  products: [],
};

function productsReducer(
  state: ProductsType = initialState,
  action: ProductActionType,
): ProductsType {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      const {
        payload: {
          response: { data },
        },
      } = action;
      return {
        ...state,
        isLoading: false,
        products: [...data],
      };
    }
    case GET_PRODUCTS_FAILURE: {
      const {
        payload: { error },
      } = action;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    default:
      return state;
  }
}

export default productsReducer;
