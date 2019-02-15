import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AuthForm from '../AuthForm';

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    };
    render() {
        return (
            <AuthForm login navigation={this.props.navigation} />
        );
    }
}
export default Login;
