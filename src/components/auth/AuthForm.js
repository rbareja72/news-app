import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './../common';
import { styles } from './AuthForm.style';

export default class AuthForm extends Component {
    
    constructor() {
        super();
        this.onPasswordInputChange = this.onPasswordInputChange.bind(this);
        this.onEmailInputChange = this.onEmailInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        email: '',
        password: ''
    };
    onEmailInputChange(text) {
        this.setState({ email: text });
    }
    onPasswordInputChange(text) {
        this.setState({ password: text });
    }
    onSubmit() {
        this.props.onPrimaryPress(this.state.email, this.state.password);
    }
    

    renderRegister() {
        if (this.props.login) {
            return (
                <CardSection>
                    <Button onPress={this.props.onSecondaryPress}>
                        Register
                    </Button>
                </CardSection>
            );
        }
    }
    renderButton() {
        if (this.props.loading) {
            return <Spinner size='large' />;
        }
        return (
            <Button onPress={this.onSubmit}>
                {this.props.login ? 'Login' : 'Register'}
            </Button>
        );
    }
    renderError() {
        if (this.props.errorMessage) {
            return (
                <View style={styles.errorMessageContainer}>
                    <Text style={styles.errorMessage}>
                        {this.props.errorMessage}
                    </Text> 
                </View>
                
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
                        onSubmitEditing={this.onSubmit}
                        onChangeText={this.onEmailInputChange}
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        label="Password"
                        placeholder="*********"
                        secureTextEntry
                        onSubmitEditing={this.onSubmit}
                        onChangeText={this.onPasswordInputChange}
                    />
                </CardSection>
                {this.renderError()}
                <CardSection>
                    {this.renderButton()}
                </CardSection>
                {this.renderRegister()}
            </Card>
        );
    }
}
