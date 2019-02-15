import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';

export const store = () => {
    return createStore(reducers, {}, applyMiddleware(ReduxThunk));
};
