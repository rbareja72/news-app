import { signin, signup } from '../../services/Auth.service';
import { setItem, deleteItem } from './../../services/BaseStorageService';
import { emailMatch, passwordMatch } from './../../utils/Validations';
import {
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    AUTH_START,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_OUT,
} from './Types';

export const login = async (dispatch, email, password, navigation) => {
    dispatch({
        type: AUTH_START
    });
    if (!emailMatch(email)) {
        return dispatch({
            type: SIGN_IN_FAIL,
            payload: 'Email not Correct'
        });
    }
    if (!passwordMatch(password)) {
        return dispatch({
            type: SIGN_IN_FAIL,
            payload: 'Password must contain atleast 8 characters' +
            'and at least 1 letter, 1 number and one special Character'
        });
    }
    let response;
    try {
        response = await signin(email, password);
    } catch (err) {
        throw err;
    }
    
    if (response && response.token) {
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: response.token
        });
        navigation.navigate('main');
        setItem('token', response.token);
    } else {
        dispatch({
            type: SIGN_IN_FAIL,
            payload: 'unknown error occured'
        });
    }
};

export const register = async (dispatch, email, password, navigation) => {
    dispatch({
        type: AUTH_START
    });
    if (!emailMatch(email)) {
        return dispatch({
            type: SIGN_UP_FAIL,
            payload: 'Email not Correct'
        });
    }
    if (!passwordMatch(password)) {
        return dispatch({
            type: SIGN_UP_FAIL,
            payload: 'Password must contain atleast 8 characters' +
            'and at least 1 letter, 1 number and one special Character'
        });
    }
    let response;
    try {
        response = await signup(email, password);
    } catch (err) {
        throw err;
    }
    
    if (response && response.token) {
        setItem('token', response.token).then(() => {
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: response.token
            });
            navigation.navigate('main');
        });
    } else {
        dispatch({
            type: SIGN_UP_FAIL,
            payload: 'unknown error occured'
        });
    }
};

export const signOut = (dispatch, navigation) => {
    deleteItem('token').then(() => {
        dispatch({
            type: SIGN_OUT
        });
        navigation.navigate('auth');
    });
};
