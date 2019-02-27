import { combineReducers } from 'redux';
import { AuthReducer } from './components/auth/Auth.reducer';
import { NewsReducer } from './components/main/News.reducer';
import { NetworkReducer } from './components/Network.reducer';

export default combineReducers({
    auth: AuthReducer,
    news: NewsReducer,
    network: NetworkReducer
});
