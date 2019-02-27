import React, { Component } from 'react';
import { ToolbarAndroid, FlatList, View, CameraRoll } from 'react-native';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { Spinner } from '../../common';
import { getNews } from './../News.action';
import { signOut } from './../../auth/Auth.action';
import { styles } from './NewsList.style';
import { commonStyles } from './../../../Common.style';

class NewsList extends Component {
    static navigationOptions() { 
        return {
            header: null
        };   
    }

    constructor() {
        super();
        this.onActionSelected = this.onActionSelected.bind(this);
    }

    state = {};

    componentDidMount() {
        if (this.props.isConnected) {
            this.props.getNews();
        } else {
            this.refs.toast.show('No Internet Connection');
        }        
    }

    componentWillUnmount() {
        if (this.props.isConnected) {
            this.props.signOut();
        }        
    }

    onActionSelected(position) {
        if (this.props.isConnected) {
            switch (position) {
                case 0: 
                    this.props.signOut(this.props.navigation);
                    break;
                case 1:
                    this.updateImage();
                    break;
                default:
                    return;
            }
        } else {
            this.refs.toast.show('No Internet Connection');
        }        
    }

    updateImage() {
        //CameraRoll.getPhotos()
    }

    render() {
        const {
            fill,
            column,
            boxShadow,
            verticalCenter
        } = commonStyles;       
        if (this.props.loaded) {
            return (
                <View style={[column, fill]}>
                    <ToolbarAndroid
                        title='News'
                        actions={[{
                            title: 'Sign Out',
                            show: 'never'
                        },{
                            title:'Profile Image',
                            icon: require('./../../../images/user.png'),
                            show: 'always'
                        }]}
                        style={[styles.headerStyle, boxShadow]}
                        onActionSelected={this.onActionSelected}
                    />
                    <View style={[fill]}>
                        <FlatList
                            data={this.props.news}
                            extraData={this.props.extraData}
                            renderItem={
                                ({ item }) =>
                                    <NewsItem
                                        navigation={this.props.navigation}
                                        news={item}
                                    />
                            }
                        />
                    </View>
                    <Toast ref='toast' position='bottom' />
                </View>
            );
        }
        return (
            <View style={[fill]}>
                <View style={[fill, verticalCenter ]}>
                    <Spinner 
                        size='large'
                    />
                </View>
                <Toast ref='toast' position='bottom' />
            </View>
            
        );       
    }
}

const mapStateToProps = (state) => {
    const { loaded, extraData } = state.news;
    const { isConnected } = state.network;
    const { token } = state.auth;
    let { news } = state.news;
    news = news.map((n) => {
        n.key = n.publishedAt;
        return n;
    });
    return { loaded, extraData, news, token, isConnected };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => getNews(dispatch),
        signOut: (navigation) => signOut(dispatch, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
