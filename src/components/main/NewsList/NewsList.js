import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { Spinner } from '../../common';
import { getNews } from './../News.action';

class NewsList extends Component {
    static navigationOptions() {
        return {
            title: 'News',
        };   
    }

    componentDidMount() {
        this.props.getNews();
    }

    render() {
        if (this.props.loaded) {
            return (
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
    let { news } = state.news;
    news = news.map((n) => {
        n.key = n.publishedAt;
        return n;
    });
    return { loaded, extraData, news };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => getNews(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
