import { fromJS } from 'Immutable';

// Action Types

const INCREMENT = 'INCREMENT';

// Pure Actions

const increment = () => {
  return {
    type: INCREMENT
  };
};

// Async Actions

export const incrementAsync = () => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, 200);
  };
};

// Reducer

const initialState = fromJS({
  counter: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      const newValue = state.get('counter') + 1;
      return state.set('counter', newValue);
    default:
      return state;
  }
};
