import {
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_OUT,
    AUTH_START,
    GOOGLE_SIGN_IN_SUCCESS,
    GOOGLE_SIGN_IN_FAIL,
    FACEBOOK_SIGN_IN_FAIL,
    FACEBOOK_SIGN_IN_SUCCESS
} from './Types';

const INITIAL_STATE = {
    token: '',
    gToken: '',
    fToken: '',
    errorMessage: '',
    disabled: false,
    loading: false
};
export const AuthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_START:
            return { ...state, errorMessage: '', loading: true, disabled: true };
        case FACEBOOK_SIGN_IN_SUCCESS:    
            return { ...state, errorMessage: '', disabled: false, fToken: action.payload };
        case FACEBOOK_SIGN_IN_FAIL:
            return { ...state, errorMessage: action.payload, disabled: false, loading: false };    
        case GOOGLE_SIGN_IN_SUCCESS:
            return { ...state, errorMessage: '', disabled: false, gToken: action.payload };
        case GOOGLE_SIGN_IN_FAIL:
            return { ...state, errorMessage: action.payload, disabled: false, loading: false };
        case SIGN_IN_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case SIGN_UP_SUCCESS:
            return { ...state, loading: false, token: action.payload };
        case SIGN_IN_FAIL:
            return { ...state, loading: false, errorMessage: action.payload };
        case SIGN_UP_FAIL:
            return { ...state, loading: false, errorMessage: action.payload };
        case SIGN_OUT:
            return { ...INITIAL_STATE };
        default: 
            return state;
    }
};
