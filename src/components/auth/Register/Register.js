import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    BackHandler,
    Picker
} from 'react-native';
import Toast from 'react-native-easy-toast';
import { INITIAL } from './../Types';
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

    componentDidMount() {
        this.onBackPress = BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.restoreDefault();
            return false;
        });
    }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onRegisterPress(email, password) {
        if (this.props.isConnected) {
            this.props.register(email, password, this.props.navigation);
        } else {
            this.refs.toast.show('No Internet Connection');
        }   
    }

    render() {
        const { majorContainer } = styles;
        const { verticalCenter } = commonStyles;
        const keyboardOffset = Platform.OS === 'ios' ? '40' : '0';
        const keyboardBehavior = Platform.OS === 'ios' ? '' : '';
        if (!this.props.isConnected) {
            this.refs.toast.show('No Internet Connection');
        }
        return (
            <ImageBackground
                source={require('./../../../images/bg1.jpg')}
                style={[majorContainer, verticalCenter]}
            >
                <KeyboardAvoidingView
                    behavior={keyboardBehavior}
                    keyboardVerticalOffset={keyboardOffset}
                >
                    <ScrollView>
                        <AuthForm
                            onPrimaryPress={this.onRegisterPress}
                            errorMessage={this.props.errorMessage}
                            loading={this.props.loading ? 'true' : ''}
                        />
                        
                    </ScrollView>  
                </KeyboardAvoidingView>
                <Toast position='bottom' ref='toast' />
            </ImageBackground>
            
        );
    }
}

function mapStateToProps(state) {
    const { token, errorMessage, loading } = state.auth;
    const { isConnected } = state.network;
    return { token, errorMessage, loading, isConnected };
}

function mapDispatchToProps(dispatch) {
    return {
        register: (email, password, navigation) => register(dispatch, email, password, navigation),
        restoreDefault: () => dispatch({
            type: INITIAL
        })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
