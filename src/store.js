import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

import reducer from './reducers';

export default createStore(reducer, REDUX_DEVTOOLS, applyMiddleware(thunk));