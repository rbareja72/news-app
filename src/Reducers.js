import { combineReducers } from 'redux';
import { AuthReducer } from './components/auth/Auth.reducer';
import { NewsReducer } from './components/main/News.reducer';

export default combineReducers({
    auth: AuthReducer,
    news: NewsReducer
});
