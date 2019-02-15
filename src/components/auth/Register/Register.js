import React, { Component } from 'react';
import { View } from 'react-native';
import AuthForm from '../AuthForm';

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    };
    render() {
        return (
            <AuthForm />
        );
    }
}
export default Register;
