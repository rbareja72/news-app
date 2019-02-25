import React, { Component } from 'react';
import { View, Button } from 'react-native';
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
                getItem('loginType').then((loginType) => {
                    switch (loginType) {
                        case '1':
                            this.props.navigation.navigate('main');
                            break;
                        case '2':
                            GoogleSignin.isSignedIn().then((isSignedIn) => {
                                if (isSignedIn) {
                                    this.props.googleLoginSilently(this.props.navigation);        
                                }
                            });
                            break;
                        case '3':
                            AccessToken.getCurrentAccessToken().then((data) => {
                                if (data && data.accessToken) {
                                    this.props.navigation.navigate('main');
                                }
                            });
                            break;
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

    facebookSignin() {
        this.props.facebookLogin(this.props.navigation);
    }

    renderLoginForm() {
        const { centerSelf } = commonStyles;
        const { googleSigninButton, facebookSigninButton, loaderContainer } = styles;
        if (this.props.disabled) {
            return (
                <View style={[loaderContainer]}>
                    <Spinner size='large' />
                </View>
            );  
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
                <Button
                    onPress={this.facebookSignin}
                    title='Login With Facebook'
                    color='#4267b2'
                    style={facebookSigninButton}
                />
            </View>
        );
    }
    
    render() {
        const { majorContainer } = styles;
        if (this.state.token !== '') {
            return <Spinner size='large' />;
        } 
        return (
            <View style={ majorContainer }>
                {this.renderLoginForm()}
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
        facebookLogin: (navigation) => facebookLogin(dispatch, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
