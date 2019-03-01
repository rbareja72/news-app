import { FETCH_NEWS } from './Types';

const INITIAL_STATE = {
    news: [],
    extraData: false,
    loaded: false
};

export const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return { ...state, news: action.payload, extraData: !state.extraData, loaded: true };
        default:
            return state;
    }
};
