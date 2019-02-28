import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Image } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { Spinner, Header } from '../../common';
import { getNews } from './../News.action';
import { signOut } from './../../auth/Auth.action';
import { setItem, getItem } from './../../../services/BaseStorageService';
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

    state = {
        image: null
    };

    componentDidMount() {
        if (this.props.isConnected) {
            this.props.getNews();
        } else {
            this.refs.toast.show('No Internet Connection');
        }        
        this.fetchImage();
        this.updateImage = this.updateImage.bind(this);
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
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true
        }).then(image => {
            const imageString = `data: ${image.mime};base64,${image.data}`;
            setItem('profilePhoto', imageString);
            this.setState({ image: imageString });
        });
    }

    async fetchImage() {
        const image = await getItem('profilePhoto');
        if (image) {
            this.setState({ image });    
        }
        
    }

    render() {
        const {
            fill,
            column,
            verticalCenter,
            row,
            circle
        } = commonStyles;       
        const {
            headerIconContainerStyle,
            headerIconStyle
        } = styles;
        if (this.props.loaded) {
            return (
                <View style={[column, fill]}>
                    <Header
                        headerText='News'
                    >
                        <View style={row}>
                            <View style={headerIconContainerStyle}>
                                <TouchableOpacity onPress={this.updateImage} >
                                    <Image
                                        style={[headerIconStyle, circle]}
                                        source={
                                          this.state.image ? { uri: this.state.image } : require('./../../../images/user.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={headerIconContainerStyle}>
                                <TouchableOpacity>
                                    <Image
                                        style={headerIconStyle}
                                        source={require('./../../../images/overflow.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Header>
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
