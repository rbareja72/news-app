import React, { Component } from 'react';
import { Card, CardSection, Input, Button } from './../common';

export default class AuthForm extends Component {
    
    
    constructor() {
        super();
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
        this.onEmailInputChange = this.onEmailInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onEmailInputChange() {

    }
    onPasswordInputChange() {

    }
    onSubmit() {
        this.props.navigation.navigate('list');
    }
    renderRegister() {
        if (this.props.login) {
            return (
                <CardSection>
                    <Button onPress={() => this.props.navigation.navigate('register')}>
                        Register
                    </Button>
                </CardSection>
            );
        }
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="username@abcd.com"
                        onChangeText={this.onEmailInputChange}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        label="Password"
                        placeholder="*********"
                        secureTextEntry
                        onChangeText={this.onPasswordInputChange}
                    />
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSubmit}>{this.props.login ? 'Login' : 'Register'}</Button>
                </CardSection>
                {this.renderRegister()}
            </Card>
        );
    }
}
