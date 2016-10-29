import { fromJS } from 'Immutable';
import { createAction, handleActions } from 'redux-actions';

import { fetchForecast } from '../../data/weather';

const RECEIVE_FORECASTS = 'RECEIVE_FORECASTS';

const FIND_PERFECT_WEATHER = 'FIND_PERFECT_WEATHER';

const receiveForecast = createAction(RECEIVE_FORECASTS);

const findPerfectWeather = createAction(FIND_PERFECT_WEATHER, processForecasts);

const perfectConditions = {
  wind: {
    min: 0,
    max: 5
  },
  temp: {
    min: 40,
    max: 90
  },
  rain: {
    min: 0,
    max: 0.5
  }
};

export const requestForecasts = () => {
  return (dispatch) => {
    fetchForecast('Boston,MA')
      .then((data) => {
        dispatch(receiveForecast(data));
        dispatch(findPerfectWeather(processForecasts(data)));
      });
  };
};

const processForecasts = (data) => {
  return data.list.map((forecast) => {
    const isPerfectRain = !forecast.rain['3h'] ||
      (forecast.rain['3h'] > perfectConditions.rain.min &&
        forecast.rain['3h'] < perfectConditions.rain.max);
    const isPerfectTemp = forecast.main.temp > perfectConditions.temp.min &&
      forecast.main.temp < perfectConditions.temp.max;
    const isPerfectWind = forecast.wind.speed > perfectConditions.wind.min &&
      forecast.wind.speed < perfectConditions.wind.max;

    return {
      timestamp: forecast.dt,
      isPerfectWind,
      isPerfectTemp,
      isPerfectRain
    };
  });
};

const initialState = fromJS({
  forecasts: {},
  processedForecasts: {}
});

export default handleActions({
  [RECEIVE_FORECASTS]: (state, action) => state.set('forecasts', fromJS(action.payload)),
  [FIND_PERFECT_WEATHER]: (state, action) => state.set('processedForecasts', fromJS(action.payload))
}, initialState);
