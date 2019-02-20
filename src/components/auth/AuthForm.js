import React, { Component } from 'react';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import {
    register,
    emailLabel,
    emailPlaceholder,
    passwordLabel,
    passwordPlaceholder,
    login,
} from './AuthForm.config';
import { Card, CardSection, Input, Button, Spinner } from './../common';
import { styles } from './AuthForm.style';
import { commonStyles } from '../../Common.style';

export default class AuthForm extends Component {
    
    constructor() {
        super();
        this.onInputChange = this.onInputChange.bind(this);
        this.moveFocusTo = this.moveFocusTo.bind(this);
        this.inputs = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    state = {
        email: '',
        password: ''
    };
    onInputChange(values) {
        const keys = Object.keys(values);
        const obj = {};
        obj[keys[0]] = values[keys[0]];
        this.setState(obj);
    }

    onSubmit() {
        this.props.onPrimaryPress(this.state.email, this.state.password);
    }
    
    moveFocusTo(id) {
        this.inputs[id].focus();
    }

    renderRegister() {
        const { fontLarge } = commonStyles;
        if (this.props.login) {
            return (
                <CardSection>
                    <Button onPress={this.props.onSecondaryPress} textStyle={fontLarge}>
                        {register}
                    </Button>
                </CardSection>
            );
        }
    }
    renderButton() {
        const { fontLarge } = commonStyles;
        if (this.props.loading) {
            return <Spinner size='large' />;
        }
        return (
            <Button onPress={this.onSubmit} textStyle={fontLarge}>
                {this.props.login ? login : register}
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
        const { textContainerStyle } = styles;
        const { fontLarge } = commonStyles;
        return (
            <KeyboardAvoidingView>
                <Card>
                    <CardSection>
                        <Input 
                            label={emailLabel}
                            placeholder={emailPlaceholder}
                            onRef={(ref) => {
                                this.inputs.email = ref;
                            }}
                            onSubmitEditing={() => {
                                this.moveFocusTo('password');
                            }}
                            labelStyle={fontLarge}
                            inputStyle={fontLarge}
                            containerStyle={textContainerStyle}
                            returnKeyType={'next'}
                            blurOnSubmit={false}
                            onChangeText={(text) => this.onInputChange({ email: text })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                            label={passwordLabel}
                            placeholder={passwordPlaceholder}
                            secureTextEntry
                            onRef={(ref) => {
                                this.inputs.password = ref;
                            }}
                            labelStyle={fontLarge}
                            inputStyle={fontLarge}
                            containerStyle={textContainerStyle}
                            onSubmitEditing={this.onSubmit}
                            onChangeText={(text) => this.onInputChange({ password: text })}
                        />
                    </CardSection>
                    {this.renderError()}
                    <CardSection>
                        {this.renderButton()}
                    </CardSection>
                    {this.renderRegister()}
                </Card>
            </KeyboardAvoidingView>
        );
    }
}
