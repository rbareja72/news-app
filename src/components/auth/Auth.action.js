import { signin, signup } from '../../services/Auth.service';
import { setItem } from './../../services/BaseStorageService';
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
    const response = await signin(email, password);
    if (response.token) {
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
    const response = await signup(email, password);
    if (response.token) {
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
    setItem('token', '').then(() => {
        dispatch({
            type: SIGN_OUT
        });
        navigation.navigate('auth');
    });
    
};

function emailMatch(email) {
    const emailPattern = '^[a-zA-Z0-9.!#$%&\'*+/=?^' +
    '_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])' +
    '?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
    return email.match(emailPattern);
}

function passwordMatch(password) {
    const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
    return password.match(passwordPattern);
}