import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './rootReducer';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  routerMiddleware(browserHistory)
)(createStore);

export default createStoreWithMiddleware(rootReducer);
