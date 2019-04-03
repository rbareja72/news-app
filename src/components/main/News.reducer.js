import { FETCH_NEWS, TOGGLE_ACTION_MENU, REFRESH_NEWS, FETCH_MORE_NEWS, NEXT_PAGE } from './Types';

const INITIAL_STATE = {
    news: [],
    extraData: false,
    loaded: false,
    modalVisible: false,
    page: 1
};

export const NewsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REFRESH_NEWS:
            return { ...state, loaded: false, page: 1 };
        case FETCH_NEWS:
            return { ...state, news: action.payload, extraData: !state.extraData, loaded: true };
        case NEXT_PAGE:
            return { ...state, page: state.page + 1 };
        case FETCH_MORE_NEWS:        
            return { ...state, news: [...state.news, ...action.payload], extraData: !state.extraData };
        case TOGGLE_ACTION_MENU:
            return { ...state, modalVisible: action.payload };
        default:
            return state;
    }
};
