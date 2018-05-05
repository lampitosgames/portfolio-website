import actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
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
        default:
            return state;
    }
}

export default settings;
