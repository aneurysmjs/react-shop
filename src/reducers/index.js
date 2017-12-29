import { SET_SEARCH_TERM } from '../constants/ActionTypes';
import setSearchTerm from './setSearchTerm';

const initialState = {
  searchTerm: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_SEARCH_TERM:
      return setSearchTerm(state, action);

    default:
      return state;
  }
};

export default rootReducer;