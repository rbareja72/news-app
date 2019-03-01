import { FETCH_NEWS, TOGGLE_ACTION_MENU } from './Types';

const INITIAL_STATE = {
    news: [],
    extraData: false,
    loaded: false,
    modalVisible: false
};

export const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_NEWS:
            return { ...state, news: action.payload, extraData: !state.extraData, loaded: true };
        case TOGGLE_ACTION_MENU:
            return { ...state, modalVisible: action.payload };
        default:
            return state;
    }
};
