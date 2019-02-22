import { GoogleSignin } from 'react-native-google-signin';
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
    GOOGLE_SIGN_IN_FAIL,
    GOOGLE_SIGN_IN_SUCCESS
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
    let key = 'token';
    GoogleSignin.isSignedIn().then((isSignedIn) => {
        if (isSignedIn) {
            key = 'gToken';
            GoogleSignin.signOut();
        }
        deleteItem(key).then(() => {
            dispatch({
                type: SIGN_OUT
            });
            navigation.navigate('auth');
        });
    });
};

export const googleLogin = async (dispatch, navigation) => {
    dispatch({
        type: AUTH_START
    });
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        setItem('gToken', userInfo.accessToken).then(() => {
            dispatch({
                type: GOOGLE_SIGN_IN_SUCCESS,
                payload: userInfo.accessToken
            });
            navigation.navigate('main'); 
        });    
    } catch (e) {
        dispatch({
            type: GOOGLE_SIGN_IN_FAIL,
            payload: 'Error Occured.'
        });
    }
};


export const googleLoginSilently = async (dispatch, navigation) => {
    dispatch({
        type: AUTH_START
    });
    try {
        await GoogleSignin.hasPlayServices();
        const currUser = await GoogleSignin.signInSilently()
        setItem('gToken', currUser.accessToken).then(() => {
            dispatch({
                type: GOOGLE_SIGN_IN_SUCCESS,
                payload: currUser.accessToken
            });
            navigation.navigate('main'); 
        });
    } catch (e) {
        console.log(e);        
        dispatch({
            type: GOOGLE_SIGN_IN_FAIL,
            payload: ''
        });
    }
};
