import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware
    )
);

export default function configStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
