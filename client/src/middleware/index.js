const defaultMiddleware = store => next => action => {
    if (action.type === 'LISTEN_TO_NEW_USERS') {
        //Do stuff to this action. Sniff it's data. Etc.
    }
    next(action);
}

export default [
    defaultMiddleware
]
