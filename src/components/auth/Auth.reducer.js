import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT,
    AUTH_START,
    INITIAL
} from './Types';

/**
 * 0: default
 * 1: email
 * 2: google
 * 3: fb
 */

const INITIAL_STATE = {
    token: '',
    loginType: '0', 
    errorMessage: '',
    disabled: false,
    loading: false
};
export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, errorMessage: '', loading: action.payload.loading, disabled: true };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
                loginType: action.payload.type
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload,
                loginType: action.payload.type,
                disabled: true
            };
        case SIGN_IN_FAIL:
            return { ...state, loading: false, errorMessage: action.payload, disabled: false };
        case SIGN_UP_FAIL:
            return { ...state, loading: false, errorMessage: action.payload, disabled: false };
        case SIGN_OUT:
        case INITIAL:
            return { ...INITIAL_STATE };
        default: 
            return state;
    }
};
