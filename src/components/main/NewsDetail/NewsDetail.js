import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { commonStyles } from '../../../Common.style';
import { styles } from './NewsDetail.style';


export default class NewsDetail extends Component {
    static navigationOptions() {
        return {
            header: null
        };
    }
    render() {
        console.log(this.props.navigation.getParam('newsItem'));
        const { urlToImage, title, content, author, url } = this.props.navigation.getParam('newsItem');
        const {
            heading,
            headingColor,
            column,
            textDefault,
            fill,
            fontLarge,
            fontSmall,
            fontXLarge,
            textShadow,
            rightAlign,
            underline
        } = commonStyles;
        const {
            backButtonContainer,
            backButtonText,
            backButtonTextContainer,
            textContainer,
            imageStyle
        } = styles;
        return (
            
            <ScrollView style={[column]}>
                <View style={[column]}>
                    <Image
                        source={{ uri: urlToImage }}
                        style={imageStyle}
                    />
                </View>
                <View style={[fill, textContainer]}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('webView', {
                            url
                        })}
                    >
                        <Text style={[heading, fontLarge, headingColor, underline]}>{title}</Text>
                    </TouchableWithoutFeedback>
                    <Text style={[rightAlign, headingColor]}>-{author}</Text>
                    <Text style={[fontSmall, textDefault]}>{content}</Text>
                </View>
                <View style={backButtonContainer}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={[backButtonTextContainer]}>
                            <Text style={[backButtonText, textShadow, fontXLarge]}>
                                &lt;
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}
