import React, { Component } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import { Card } from './../../common';
import { styles } from './NewsItem.style';
import { commonStyles } from './../../../Common.style';

export default class NewsItem extends Component {
    render() {
        const {
            imageStyle,
            parentContainer,
            titleContainer,
            dateContainer,
            circleIos
        } = styles;
        const {
            verticalCenter,
            row,
            fill,
            heading,
            headingColor,
            fontSmall,
            circleAndroid,
        } = commonStyles;
        const {
            title,
            publishedAt,
            urlToImage,
        } = this.props.news;
        const circleStyle = Platform.OS === 'ios' ? circleIos : circleAndroid;
        return (
            <Card>
                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('detail', {
                        newsItem: this.props.news
                    })}
                >
                    <View style={[row]}>
                        <View style={parentContainer}>
                            <Image 
                                source={
                                    urlToImage ? 
                                        { uri: urlToImage } :
                                        require('./../../../images/default.png')
                                    }
                                style={[circleStyle, imageStyle, verticalCenter]}
                            />
                        </View>
                        <View style={[fill, parentContainer]}>
                            <View style={[titleContainer, fill]}>
                                <Text
                                    style={[heading, headingColor]}
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                >
                                    {title}
                                </Text>
                            </View>
                            <View style={[dateContainer, fill]}>
                                <Text style={[fontSmall]}>{publishedAt}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Card>
        );
    }
}
