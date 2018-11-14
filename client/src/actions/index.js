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

export const viewportUpdate = (_newViewport) => {
    return {
        type: actionTypes.VIEWPORT_UPDATE,
        newView: _newViewport
    }
}
