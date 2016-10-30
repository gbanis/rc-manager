import { fromJS } from 'Immutable';
import { createAction, handleActions } from 'redux-actions';

import { fetchForecasts } from '../../data/weather';

const RECEIVED_FORECASTS = 'RECEIVED_FORECASTS';

const receivedForecasts = createAction(RECEIVED_FORECASTS);

export const requestForecasts = () => {
  return (dispatch) => {
    fetchForecasts('Boston,MA')
      .then((data) => {
        dispatch(receivedForecasts(data));
      });
  };
};

const initialState = fromJS({
  forecasts: {}
});

export default handleActions({
  [RECEIVED_FORECASTS]: (state, action) => state.set('forecasts', fromJS(action.payload))
}, initialState);
