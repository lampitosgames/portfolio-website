import actionTypes from '../actions/actionTypes';

//Initial sidebar state
const initialState = {
  active: false,
};

const error = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.TOGGLE_SIDEBAR:
    return {
      active: !state.active
    };
  default:
    return state;
  }
}

export default error;