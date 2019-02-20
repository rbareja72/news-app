import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT,
    AUTH_START
} from './Types';

const INITIAL_STATE = {
    token: '',
    errorMessage: '',
    loading: false
};
export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, errorMessage: '', loading: true };
        case SIGN_IN_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case SIGN_UP_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case SIGN_IN_FAIL:
            return { ...state, loading: false, errorMessage: action.payload };
        case SIGN_UP_FAIL:
            return { ...state, loading: false, errorMessage: action.payload };
        case SIGN_OUT:
            return { ...state };
        default: 
            return state;
    }
};
