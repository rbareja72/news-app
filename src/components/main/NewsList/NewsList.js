import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { Spinner } from '../../common';


class NewsList extends Component {
    static navigationOptions() {
        return {
            title: 'News',
        };   
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

const mapStateToProps = () => {
    
};

const mapDispatchToProps = () => {

};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
