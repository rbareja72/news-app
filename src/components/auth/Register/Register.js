import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ImageBackground, KeyboardAvoidingView, ScrollView } from 'react-native';
import { styles } from './Register.styles';
import AuthForm from '../AuthForm';
import { register } from '../Auth.action';
import { commonStyles } from '../../../Common.style';

class Register extends Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.onRegisterPress = this.onRegisterPress.bind(this);
    }

    onRegisterPress(email, password) {
        this.props.register(email, password, this.props.navigation);
    }

    render() {
        const { majorContainer } = styles;
        const { verticalCenter } = commonStyles;
        return (
            <ImageBackground
                source={require('./../../../images/bg1.jpg')}
                style={[majorContainer, verticalCenter]}
            >
                <KeyboardAvoidingView>
                    <ScrollView>
                        <AuthForm
                            onPrimaryPress={this.onRegisterPress}
                            errorMessage={this.props.errorMessage}
                            loading={this.props.loading ? 'true' : ''}
                        />
                    </ScrollView>  
                </KeyboardAvoidingView>
                
            </ImageBackground>
            
        );
    }
}

function mapStateToProps(state) {
    const { token, errorMessage, loading } = state.auth;
    return { token, errorMessage, loading };
}

function mapDispatchToProps(dispatch) {
    return {
        register: (email, password, navigation) => register(dispatch, email, password, navigation)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
