import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { styles } from './Login.style';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login, googleLogin, googleLoginSilently } from './../Auth.action';
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
    }
    
    state = {
        token: '',
    };

    componentDidMount() {
        getItem('token').then((value) => {
            if (value && value !== '') {
                this.props.navigation.navigate('main');
            } else {
                this.props.googleLoginSilently(this.props.navigation);
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
    
    render() {
        const { centerSelf } = commonStyles;
        const { googleSigninButton } = styles;
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
        googleLoginSilently: (navigation) => googleLoginSilently(dispatch, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
