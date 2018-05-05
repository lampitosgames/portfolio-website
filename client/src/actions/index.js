import actionTypes from './actionTypes';

//EXAMPLES
export const incrementCounter = (_incrementAmount) => {
    return {
        type: actionTypes.INCREMENT,
        amount: _incrementAmount
    };
}

export const decrementCounter = (_decrementAmount) => {
    return {
        type: actionTypes.DECREMENT,
        amount: _decrementAmount
    };
}
