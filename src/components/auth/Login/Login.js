import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, KeyboardAvoidingView, ScrollView, NetInfo } from 'react-native';
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
import SnackBar from 'react-native-snackbar';
import { connect } from 'react-redux';
import { AccessToken } from 'react-native-fbsdk';
import { styles } from './Login.style';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login, googleLogin, googleLoginSilently, facebookLogin } from './../Auth.action';
import { getItem } from './../../../services/BaseStorageService';
import { commonStyles } from '../../../Common.style';

class Login extends Component {
    static navigationOptions = {
        header: null
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
        NetInfo.addEventListener('connectionChange', (connectionInfo) => {
            console.log(connectionInfo.type);
            if (connectionInfo.type === 'none') {
                SnackBar.show({
                    title: 'No Internet Connection',
                    duration: SnackBar.LENGTH_LONG
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
        const { centerSelf, fill, row } = commonStyles;
        const {
            googleSigninButton,
            loaderContainer,
            facebookSigninButtonText
        } = styles;
        if (this.props.loading) {
            return (
                <View style={[loaderContainer]}>
                    <Spinner size='large' />
                </View>
            );  
        } 
        if (!this.props.disabled) {
            return (
                <KeyboardAvoidingView
                    behavior="postion"
                    keyboardVerticalOffset='0'
                >
                    <ScrollView>
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
                    
                    <View style={[row, centerSelf]}>
                        <TouchableOpacity
                            onPress={this.facebookSignin}
                        >
                            <View style={[centerSelf]}>
                                <Text style={[facebookSigninButtonText]}>Login With facebook</Text>        
                            </View>
                        </TouchableOpacity>
                    </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            );
        }
    }
    
    render() {
        const { majorContainer } = styles;
        const { verticalCenter } = commonStyles;
        if (this.state.token !== '') {
            return <Spinner size='large' />;
        } 
        return (
            <ImageBackground
                source={require('./../../../images/bg1.jpg')}
                style={[majorContainer, verticalCenter]}
            >
            {this.renderLoginForm()}   
            </ImageBackground>
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
