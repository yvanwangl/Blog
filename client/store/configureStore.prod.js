import {createStore} from 'redux';
import rootReducer from '../reducers';

export default function configStore(initialState) {
    console.log('product');
    return createStore(rootReducer, initialState);
}
