import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import NewsItem from '../NewsItem/NewsItem';
import { HeaderWithSearch, ActionMenu } from '../../common';
import { getNews, toggleMenu, refreshNews, fetchMoreNews } from './../News.action';
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
            this.props.getNews(1);
        } else {
            this.refs.toast.show('No Internet Connection');
        }        
        this.fetchImage();
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
        }, (error) => {
                if (error.code === 'E_PERMISSION_MISSING') {
                    alert('No Permission to access photos.'  
                    + 'To upload profile picture, app requires permissoin to access photo.');
                }
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
            row,
            circleAndroid,
            circleIos
        } = commonStyles;       
        const {
            headerIconContainerStyle,
            headerIconStyle
        } = styles;
        const circleStyle = Platform.OS === 'ios' ? circleIos : circleAndroid;
        return (
            <SafeAreaView style={[column, fill]}>
                <HeaderWithSearch
                    headerText='News'
                    enableSearch
                >
                    <View style={[row]}>
                        <View style={headerIconContainerStyle}>
                            <TouchableOpacity onPress={this.updateImage} >
                                <Image
                                    style={[headerIconStyle, circleStyle]}
                                    source={
                                        this.state.image != null ? 
                                        { uri: this.state.image } : 
                                        require('./../../../images/user.png')}
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
                </HeaderWithSearch>
                <View style={[fill]}>
                    <FlatList
                        data={this.props.news}
                        extraData={this.props.extraData}
                        onRefresh={this.props.refreshNews}
                        refreshing={!this.props.loaded}
                        onEndReachedThreshold="0"
                        onEndReached={() => this.props.fetchMoreNews(this.props.page)}
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
}

const mapStateToProps = (state) => {
    const { loaded, extraData, modalVisible, page } = state.news;
    const { isConnected } = state.network;
    const { token } = state.auth;
    let { news } = state.news;
    news = news.map((n) => {
        n.key = n.publishedAt;
        return n;
    });
    return { loaded, extraData, news, token, isConnected, modalVisible, page };
};

const mapDispatchToProps = dispatch => ({
        getNews: (page) => getNews(dispatch, page),
        refreshNews: () => refreshNews(dispatch),
        fetchMoreNews: (page) => fetchMoreNews(dispatch, page),
        signOut: (navigation) => signOut(dispatch, navigation),
        toggleMenu: (visibility) => toggleMenu(dispatch, visibility)
    });

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
