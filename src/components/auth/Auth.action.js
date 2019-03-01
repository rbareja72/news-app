import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { signin, signup } from '../../services/Auth.service';
import { setItem, deleteItem, getItem } from './../../services/BaseStorageService';
import { emailMatch, passwordMatch } from './../../utils/Validations';
import {
    SIGN_IN_FAIL,
    SIGN_IN_SUCCESS,
    AUTH_START,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_OUT
} from './Types';

export const login = async (dispatch, email, password, navigation) => {
    dispatch({
        type: AUTH_START,
        payload: { loading: true }
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
            payload: { token: response.token, loginType: '1' }
        });
        navigation.navigate('main');
        setItem('token', response.token);
        setItem('loginType', '1');
    } else {
        dispatch({
            type: SIGN_IN_FAIL,
            payload: 'unknown error occured'
        });
    }
};

export const register = async (dispatch, email, password, navigation) => {
    dispatch({
        type: AUTH_START,
        payload: { loading: true }
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
                payload: { token: response.token, loginType: '1' }
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
    getItem('loginType').then((loginType) => {
        switch (loginType) {
            case '2':
                GoogleSignin.signOut();
                break;
            case '3':
                LoginManager.logOut();
                break;
        }
        setItem('loginType', '0');
        deleteItem('token').then(() => {
            dispatch({
                type: SIGN_OUT
            });
            if (navigation) {
                navigation.navigate('auth');
            }            
        });
    });
};

export const googleLogin = async (dispatch, navigation) => {
    dispatch({
        type: AUTH_START,
        payload: { loading: true }
    });
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        setItem('token', userInfo.accessToken).then(() => {
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: { token: userInfo.accessToken, loginType: '2' }
            });
            setItem('loginType', '2');
            navigation.navigate('main'); 
        });    
    } catch (e) {
        dispatch({
            type: SIGN_IN_FAIL,
            payload: 'Error Occured.'
        });
    }
};


export const googleLoginSilently = async (dispatch, navigation) => {
    dispatch({
        type: AUTH_START,
        payload: { loading: true }
    });
    try {
        await GoogleSignin.hasPlayServices();
        const currUser = await GoogleSignin.signInSilently();
        setItem('token', currUser.accessToken).then(() => {
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: { token: currUser.accessToken, loginType: '2' }
            });
            setItem('loginType', '2');
            navigation.navigate('main'); 
        });
    } catch (e) {
        dispatch({
            type: SIGN_IN_FAIL,
            payload: ''
        });
    }
};

export const facebookLogin = async (dispatch, navigation) => {
    dispatch({
        type: AUTH_START,
        payload: { loading: false }
    });
    LoginManager.logInWithReadPermissions(
        ['public_profile', 'email', 'user_friends']).then(
            (result) => {                
                if (!result.isCancelled) {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        setItem('token', data.accessToken).then(() => {
                            dispatch({
                                type: SIGN_IN_SUCCESS,
                                payload: { token: data.accessToken, loginType: '3' }
                            });
                            setItem('loginType', '3');                
                            navigation.navigate('main'); 
                        });
                    }).catch(() => {
                        dispatch({
                            type: SIGN_IN_FAIL,
                            payload: 'Failed.'
                        });
                    });
                }
            }
        );
};
