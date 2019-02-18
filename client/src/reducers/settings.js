import actionTypes from '../actions/actionTypes';

const initialState = {
  counter: 0,
  viewport: {
    width: 0,
    height: 0,
    vw: 0,
    vh: 0
  }
};

const settings = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.INCREMENT:
    return {
      ...state,
      counter: state.counter + action.amount
    };
  case actionTypes.DECREMENT:
    return {
      ...state,
      counter: state.counter - action.amount
    };
  case actionTypes.VIEWPORT_UPDATE:
    return {
      ...state,
      viewport: {
        width: action.newView.width,
        height: action.newView.height,
        vw: action.newView.vw,
        vh: action.newView.vh
      }
    };
  default:
    return state;
  }
}

export default settings;