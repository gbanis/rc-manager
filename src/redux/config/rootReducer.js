import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { homeReducer } from '../modules/home';

export default combineReducers({
  homeReducer,
  routing: routerReducer
});
