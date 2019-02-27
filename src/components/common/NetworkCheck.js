import React, { Component } from 'react';
import { NetInfo } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-easy-toast';
import { networkStateChange } from '../Network.action';

class NetworkCheck extends Component { 

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        NetInfo.getConnectionInfo().then(this.onChange);
        NetInfo.addEventListener('connectionChange', this.onChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.onChange);
    }

    onChange(connectionInfo) {
        if (connectionInfo.type === 'none') {
            this.refs.toast.show('No Internet Connection');
        } else {
            this.refs.toast.show('Connection Established');
        }
        this.props.networkStateChange(connectionInfo);
    }

    render() {
        return (
            <Toast ref='toast' position='bottom' />
        );
    }
}

const mapStateToProps = (state) => {
    const { isConnected } = state.network;
    return { isConnected };
  };
  
const mapDispatchToProps = (dispatch) => {
    return {
        networkStateChange: (connectionInfo) => networkStateChange(dispatch, connectionInfo)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkCheck);
