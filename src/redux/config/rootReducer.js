import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from '../modules/home';
import perfectWeather from '../modules/perfectWeather';

export default combineReducers({
  home,
  perfectWeather,
  routing: routerReducer
});
