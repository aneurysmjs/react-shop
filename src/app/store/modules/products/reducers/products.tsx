import {
  ProductsActionTypes,
  ProductsStateType,
  ProductActionType,
} from '~/store/modules/products/types';

const initialState = {
  error: null,
  isLoading: false,
  products: [],
};

function productsReducer(
  state: ProductsStateType = initialState,
  action: ProductActionType,
): ProductsStateType {
  switch (action.type) {
    case ProductsActionTypes.GetProductsRequest: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProductsActionTypes.GetProductsSuccess: {
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
    case ProductsActionTypes.GetProductsFailure: {
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
