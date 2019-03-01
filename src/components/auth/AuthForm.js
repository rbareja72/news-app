import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Picker from 'react-native-picker-select';
import {
    register,
    emailLabel,
    passwordLabel,
    passwordPlaceholder,
    login,
} from './AuthForm.config';
import { Card, CardSection, Input, Button, Spinner } from './../common';
import { styles } from './AuthForm.style';
import { commonStyles } from '../../Common.style';
import { colors } from './../../Colors.config';

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
        password: '',
        gender: 'm'
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
        const { transparentBackground, buttonStyle, noBorder } = styles;
        const { fontLarge } = commonStyles;
        if (this.props.login) {
            return (
                <CardSection style={[transparentBackground, noBorder]} >
                    <Button
                        onPress={this.props.onSecondaryPress}
                        textStyle={[fontLarge, buttonStyle]}
                        buttonStyle={[transparentBackground, buttonStyle]}
                    >
                        {register}
                    </Button>
                </CardSection>
            );
        }
    }
    renderButton() {
        const { fontLarge } = commonStyles;
        const { transparentBackground, buttonStyle } = styles;
        if (this.props.loading) {
            return <Spinner size='large' />;
        }
        return (
            <Button
                onPress={this.onSubmit}
                textStyle={[fontLarge, buttonStyle]}
                buttonStyle={[transparentBackground, buttonStyle]}
            >
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

    renderPicker() {
        const { transparentBackground, noBorder } = styles;
        const genders = [
            {
                label: 'Mr.',
                value: 'm',
                key: 'm'
            },
            {
                label: 'Mrs.',
                value: 'f',
                key: 'f'
            }
        ];
        if (!this.props.login) {
            return (
                <CardSection style={[ transparentBackground, noBorder]}>
                    <View style={{flex:1}}>
                        <Picker
                            items={genders}
                            onValueChange={(value) => {
                                this.setState({
                                    gender: value
                                });
                            }}
                            value={this.state.gender}
                            placeholderTextColor='white'
                            Icon={() => {
                                return (
                                    <View
                                        style={{
                                            backgroundColor: 'transparent',
                                            borderTopWidth: 10,
                                            borderTopColor: 'white',
                                            borderRightWidth: 10,
                                            borderRightColor: 'transparent',
                                            borderLeftWidth: 10,
                                            marginTop: 25,
                                            marginRight: 10,
                                            borderLeftColor: 'transparent',
                                            width: 0,
                                            height: 0,
                                        }}
                                    />
                                );
                            }}
                            style={{
                                inputAndroid: {
                                    color: 'white',
                                    borderColor: 'white',
                                    borderWidth: 1
                                }
                            }}
                        />
                    </View>
                </CardSection>
            );
        }
    }

    render() {
        const { textContainerStyle, transparentBackground, textColor, noBorder } = styles;
        const { fontLarge } = commonStyles;
        return (
            <View
                contentContainerStyle={transparentBackground}
            >
                <Card style={[transparentBackground, noBorder]}>
                    <CardSection style={[transparentBackground, noBorder]}>
                        <Input 
                            label={emailLabel}
                            onRef={(ref) => {
                                this.inputs.email = ref;
                            }}
                            onSubmitEditing={() => {
                                this.moveFocusTo('password');
                            }}
                            textColor={colors.textInputColor}
                            tintColor={colors.textInputColor}
                            baseColor={colors.textInputColor}
                            labelStyle={[fontLarge, textColor]}
                            inputStyle={[fontLarge, textColor]}
                            containerStyle={textContainerStyle}
                            returnKeyType={'next'}
                            blurOnSubmit={false}
                            onChangeText={(text) => this.onInputChange({ email: text })}
                        />    
                    </CardSection>
                    <CardSection style={[transparentBackground, noBorder]}>
                        <Input 
                            label={passwordLabel}
                            placeholder={passwordPlaceholder}
                            secureTextEntry
                            onRef={(ref) => {
                                this.inputs.password = ref;
                            }}
                            labelStyle={[fontLarge, textColor]}
                            inputStyle={[fontLarge, textColor]}
                            textColor={colors.textInputColor}
                            tintColor={colors.textInputColor}
                            baseColor={colors.textInputColor}
                            containerStyle={textContainerStyle}
                            onSubmitEditing={this.onSubmit}
                            onChangeText={(text) => this.onInputChange({ password: text })}
                        />
                    </CardSection>
                    {this.renderPicker()}
                    {this.renderError()}
                    <CardSection style={[transparentBackground, noBorder]}>
                        {this.renderButton()}
                    </CardSection>
                    {this.renderRegister()}
                </Card>
            </View>
        );
    }
}
