import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthForm from '../AuthForm';
import { register } from '../Auth.action';

class Register extends Component {
    static navigationOptions = {
        title: 'Register'
    };

    constructor() {
        super();
        this.onRegisterPress = this.onRegisterPress.bind(this);
    }

    onRegisterPress(email, password) {
        this.props.register(email, password, this.props.navigation);
    }

    render() {
        return (
            <AuthForm
                onPrimaryPress={this.onRegisterPress}
                errorMessage={this.props.errorMessage}
                loading={this.props.loading ? 'true' : ''}
            />
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
