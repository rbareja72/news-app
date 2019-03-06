import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    SafeAreaView
} from 'react-native';
import { GoogleSigninButton, GoogleSignin } from 'react-native-google-signin';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { AccessToken } from 'react-native-fbsdk';
import { styles } from './Login.style';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login, googleLogin, googleLoginSilently, facebookLogin } from './../Auth.action';
import { getItem } from './../../../services/BaseStorageService';
import { commonStyles } from '../../../Common.style';
import { INITIAL } from '../Types';


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
        if (this.props.isConnected) {
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
    }

    onLoginPress(email, password) {
        if (this.props.isConnected) {
            this.props.login(email, password, this.props.navigation);
        } else {
            this.refs.toast.show('No InternetConnection');
        }        
    }

    onRegisterPress() {
        this.props.restoreDefault();
        if (this.props.isConnected) {
            this.props.navigation.navigate('register');
        } else {
            this.refs.toast.show('No InternetConnection');
        }        
    }

    googleSignin() {
        if (this.props.isConnected) {
            this.props.googleLogin(this.props.navigation);    
        } else {
            this.refs.toast.show('No InternetConnection');
        }
    }

    facebookSignin() {
        if (this.props.isConnected) {
            this.props.facebookLogin(this.props.navigation);
        } else {
            this.refs.toast.show('No InternetConnection');
        }
    }

    renderLoginForm() {
        const { centerSelf, row } = commonStyles;
        const {
            googleSigninButton,
            loaderContainer,
            facebookSigninButtonText
        } = styles;
        const keyboardOffset = Platform.OS === 'ios' ? '40' : '0';
        if (this.props.loading) {
            return (
                <View style={[loaderContainer]}>
                    <Spinner size='large' />
                </View>
            );  
        } 
        if (!this.props.disabled) {
            return (
                <SafeAreaView>
                <KeyboardAvoidingView
                    behavior='padding'
                    keyboardVerticalOffset={keyboardOffset}
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
                </SafeAreaView>
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
                <Toast ref='toast' position='bottom' />
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    const { token, errorMessage, loading, disabled } = state.auth;
    const { isConnected } = state.network;
    return { token, errorMessage, loading, disabled, isConnected };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, navigation) => login(dispatch, email, password, navigation),
        googleLogin: (navigation) => googleLogin(dispatch, navigation),
        googleLoginSilently: (navigation) => googleLoginSilently(dispatch, navigation),
        facebookLogin: (navigation) => facebookLogin(dispatch, navigation),
        restoreDefault: () => dispatch({
            type: INITIAL
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
