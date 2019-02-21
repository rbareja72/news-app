import React, { Component } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { connect } from 'react-redux';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login } from './../Auth.action';
import { getItem } from './../../../services/BaseStorageService';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor() {
        super();
        this.onLoginPress = this.onLoginPress.bind(this);
        this.onRegisterPress = this.onRegisterPress.bind(this);
    }
    
    state = {
        token: ''
    };

    componentDidMount() {
        getItem('token').then((value) => {
            if (value && value !== '') {
                this.props.navigation.navigate('main');
            }
        });
    }

    onLoginPress(email, password) {
        this.props.login(email, password, this.props.navigation);
    }

    onRegisterPress() {
        this.props.navigation.navigate('register');
    }

    async googleSignin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ token: userInfo.accessToken });
            console.log(userInfo);            
        } catch (e) {
            console.log(e);            
        }
    }
    
    render() {
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
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.googleSignin}
                />
            </View>
            
        );
    }
}

const mapStateToProps = (state) => {
    const { token, errorMessage, loading } = state.auth;
    return { token, errorMessage, loading };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, navigation) => login(dispatch, email, password, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
