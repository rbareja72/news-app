import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from './../../common';
import AuthForm from '../AuthForm';
import { login } from './../Auth.action';
import { getItem } from './../../../services/BaseStorageService';

class Login extends Component {
    static navigationOptions = {
        title: 'Login'
    };

    static getDerivedStateFromProps(props, state) {
        if (props.token !== '') {
            props.navigation.navigate('main');
        }
        return state;
    }

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
                console.log(value);
                
                this.props.navigation.navigate('main');
            }
        });
    }

    onLoginPress(email, password) {
        this.props.login(email, password);
    }

    onRegisterPress() {
        this.props.navigation.navigate('register');
    }
    
    render() {
        if (this.state.token === ''){
            return <Spinner  size='large' />;
        } 
        return (<AuthForm
            login
            onPrimaryPress={this.onLoginPress}
            onSecondaryPress={this.onRegisterPress}
            errorMessage={this.props.errorMessage}
            loading={this.props.loading ? 'true' : ''}
        />);
    
    }
}

const mapStateToProps = (state) => {
    const { token, errorMessage, loading } = state.auth;
    return { token, errorMessage, loading };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => login(dispatch, email, password)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
