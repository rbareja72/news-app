import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { styles } from './Login.style';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login, googleLogin, googleLoginSilently, facebookLogin } from './../Auth.action';
import { getItem } from './../../../services/BaseStorageService';
import { commonStyles } from '../../../Common.style';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor() {
        super();
        this.onLoginPress = this.onLoginPress.bind(this);
        this.onRegisterPress = this.onRegisterPress.bind(this);
        this.googleSignin = this.googleSignin.bind(this);
        this.facebookSignin = this.facebookSignin.bind(this);
    }
    
    state = {
        token: '',
    };

    componentDidMount() {
        getItem('token').then((value) => {
            if (value && value !== '') {
                this.props.navigation.navigate('main');
            } else {
                GoogleSignin.isSignedIn().then((isSignedIn) => {
                    if (isSignedIn) {
                        this.props.googleLoginSilently(this.props.navigation);        
                    } else {
                        AccessToken.getCurrentAccessToken().then((data) => {
                            if (data && data.accessToken) {
                                this.props.navigation.navigate('main');
                            }
                        }, (e) => {
                            console.log(e);                        
                        });
                    }
                });                
            }
        });
    }

    onLoginPress(email, password) {
        this.props.login(email, password, this.props.navigation);
    }

    onRegisterPress() {
        this.props.navigation.navigate('register');
    }

    googleSignin() {
        this.props.googleLogin(this.props.navigation);    
    }

    facebookSignin(error, result) {
        this.props.facebookLogin(this.props.navigation, error, result);
    }
    
    render() {
        const { centerSelf } = commonStyles;
        const { googleSigninButton, facebookSigninButton } = styles;
        if (this.state.token !== '') {
            return <Spinner size='large' />;
        } 
        return (
            <View>
                <AuthForm
                    login
                    onPrimaryPress={this.onLoginPress}
                    onSecondaryPress={this.onRegisterPress}
                    errorMessage={this.props.errorMessage}
                    loading={this.props.loading ? 'true' : ''}
                />
                <GoogleSigninButton
                    style={[centerSelf, googleSigninButton]}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.googleSignin}
                    disabled={this.props.disabled}
                />
                <LoginButton
                    style={[centerSelf, facebookSigninButton]}
                    readPermissions={['public_profile']}
                    onLoginFinished={(error, result) => {
                        this.facebookSignin(error, result);
                    }}
                    disabled={this.props.disabled}
                />
            </View>
            
        );
    }
}

const mapStateToProps = (state) => {
    const { token, errorMessage, loading, disabled } = state.auth;
    return { token, errorMessage, loading, disabled };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, navigation) => login(dispatch, email, password, navigation),
        googleLogin: (navigation) => googleLogin(dispatch, navigation),
        googleLoginSilently: (navigation) => googleLoginSilently(dispatch, navigation),
        facebookLogin: (navigation, error, result) => facebookLogin(dispatch, navigation, error, result)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
