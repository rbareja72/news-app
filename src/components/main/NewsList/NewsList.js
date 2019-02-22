import React, { Component } from 'react';
import { ToolbarAndroid, FlatList, View } from 'react-native';
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
        this.props.getNews();
    }

    onActionSelected(position) {
        switch (position) {
            case 0: 
                this.props.signOut(this.props.navigation);
                break;
            default:
                return;
        }
    }

    render() {
        const {
            fill,
            column,
            boxShadow
        } = commonStyles;        
        if (this.props.loaded) {
            return (
                <View style={[column, fill]}>
                    <ToolbarAndroid
                        title='News'
                        actions={[{
                            title: 'Sign Out',
                            show: 'never'
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
                </View>
            );
        }
        return (
            <Spinner 
                size='large'
            />
        );       
    }
}

const mapStateToProps = (state) => {
    const { loaded, extraData } = state.news;
    const { token } = state.auth;
    let { news } = state.news;
    news = news.map((n) => {
        n.key = n.publishedAt;
        return n;
    });
    return { loaded, extraData, news, token };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => getNews(dispatch),
        signOut: (navigation) => signOut(dispatch, navigation)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
