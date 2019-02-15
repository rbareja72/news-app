import { combineReducers } from 'redux';

export default combineReducers({
    auth: AuthReducer,
    news: NewsReducer
});
