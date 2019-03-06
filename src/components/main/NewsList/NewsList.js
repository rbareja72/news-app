import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { Spinner, Header, ActionMenu } from '../../common';
import { getNews, toggleMenu } from './../News.action';
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
        this.onActionButtonPress = this.onActionButtonPress.bind(this);
        this.onActionItemSelect = this.onActionItemSelect.bind(this);
        this.updateImage = this.updateImage.bind(this);
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
    }

    componentWillUnmount() {
        
    }

    onActionButtonPress() {
        this.props.toggleMenu(true);
    }

    onActionItemSelect(index) {
        this.props.toggleMenu(false);
        if (this.props.isConnected) {
            switch (index) {
                case 0: 
                    this.props.signOut(this.props.navigation);
                    break;
                default:
                    return;
            }
        } else {
            this.refs.toast.show('No Internet Connection');
        }
    }

    async fetchImage() {
        const image = await getItem('profilePhoto');
        if (image) {
            this.setState({ image });    
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

    renderActionMenu() {
        const menuItems = [
            {
                value: 'Sign Out',
                key: '0'
            }
        ];      
        return (
            <ActionMenu
                visible={this.props.modalVisible}
                data={menuItems}
                onItemSelect={this.onActionItemSelect}
                onBackPress={this.onBackPress}
            />
        );
    }

    render() {
        const {
            fill,
            column,
            verticalCenter,
            row,
            circleAndroid,
            circleIos
        } = commonStyles;       
        const {
            headerIconContainerStyle,
            headerIconStyle
        } = styles;
        const circleStyle = Platform.OS === 'ios' ? circleIos : circleAndroid;
        if (this.props.loaded) {
            return (
            
                <SafeAreaView style={[column, fill]}>
                    <Header
                        headerText='News'
                    >
                        <View style={row}>
                            <View style={headerIconContainerStyle}>
                                <TouchableOpacity onPress={this.updateImage} >
                                    <Image
                                        style={[headerIconStyle, circleStyle]}
                                        source={
                                          this.state.image != null ? { uri: this.state.image } : require('./../../../images/user.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={headerIconContainerStyle}>
                                <TouchableOpacity onPress={this.onActionButtonPress}>
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
                    {this.renderActionMenu()}
                </SafeAreaView>
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
    const { loaded, extraData, modalVisible } = state.news;
    const { isConnected } = state.network;
    const { token } = state.auth;
    let { news } = state.news;
    news = news.map((n) => {
        n.key = n.publishedAt;
        return n;
    });
    return { loaded, extraData, news, token, isConnected, modalVisible };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: () => getNews(dispatch),
        signOut: (navigation) => signOut(dispatch, navigation),
        toggleMenu: (visibility) => toggleMenu(dispatch, visibility)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
