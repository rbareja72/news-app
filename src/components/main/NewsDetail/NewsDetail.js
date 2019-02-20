import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { readMore } from './NewsDetail.config';
import { commonStyles } from '../../../Common.style';
import { styles } from './NewsDetail.style';


export default class NewsDetail extends Component {
    static navigationOptions() {
        return {
            header: null
        };
    }

    constructor() {
        super();
        this.onReadMore = this.onReadMore.bind(this);
    }

    state = { isReadMore: true };

    componentDidMount() {
        const { content } = this.props.navigation.getParam('newsItem');
        if (content == null || content.length < 100) {
            this.setState({ isReadMore: false });
        }
    }

    onReadMore() {
        this.setState({ isReadMore: false });
    }

    renderReadMore() {
        const { linkBlue, fontSmall } = commonStyles;
        if (this.state.isReadMore) {
            return (
                <TouchableOpacity onPress={this.onReadMore}>
                    <Text style={[linkBlue, fontSmall]}>{readMore}</Text>
                </TouchableOpacity>
            );
        }        
    }

    renderContent(content) {
        if (content == null) {
            return;
        }
        const i = content.lastIndexOf('[');
        const s = content.substring(i);
        content = content.replace(s, '');
        const length = content.length;
        const {
            fontSmall,
            textDefault
        } = commonStyles;
        if (length > 100 && this.state.isReadMore) {
            const subContent = content.substring(0, 100) + '...';
            return (
                <Text style={[fontSmall, textDefault]}>{subContent}</Text>
            );
        }
        content = content.replace(/[\u2026]/, '');
        return (
            <Text style={[fontSmall, textDefault]}>{content}</Text>
        );
    }

    render() {
        const {
            urlToImage,
            title,
            author,
            url,
            content
        } = this.props.navigation.getParam('newsItem');
        
        const {
            heading,
            headingColor,
            column,
            fill,
            fontLarge,
            fontXLarge,
            fontSmall,
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
                    <Text style={[rightAlign, headingColor, fontSmall]}>-{author}</Text>
                    {this.renderContent(content)}
                    {this.renderReadMore()}
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
