import React, { PureComponent } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native';

class HeaderWithSearch extends PureComponent {  
    
    constructor() {
        super();
        this.onSearchPress = this.onSearchPress.bind(this);
        this.textInputRef = React.createRef();
    }

    state = {
        isSearchAreaVisible: false
    };

    onSearchPress() {
        this.setState({ isSearchAreaVisible: true }, () => {
            this.textInputRef.current.focus();
        });
    }

    renderSearch() {
        const { headerIconContainerStyle, headerIconStyle } = styles;
        if (this.props.enableSearch) {
            return (
                <View style={headerIconContainerStyle}>
                    <TouchableOpacity onPress={() => this.onSearchPress()}>
                        <Image
                            style={headerIconStyle}
                            source={require('./../../images/search.png')}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }

    render() {
        const {
            textStyle,
            actionStyle,
            headerTextContainer,
            row,
            searchField,
            viewStyle,
            headerIconStyle
        } = styles;
        const { isSearchAreaVisible } = this.state;
        if (isSearchAreaVisible) {
            return (
                <View style={viewStyle}>
                    <TouchableOpacity onPress={() => this.setState({ isSearchAreaVisible: false })}>
                        <Image
                            style={headerIconStyle}
                            source={require('./../../images/left-arrow.png')}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={searchField}
                        placeholder="Enter Search Query..."
                        onSubmitEditing={() => this.props.onSubmitSearch}
                        ref={this.textInputRef}
                    />
                </View>
            );
        }
        return (
            <View style={viewStyle}>
                <View style={headerTextContainer}>
                    <Text style={textStyle}>{this.props.headerText}</Text>
                </View>
                <View style={actionStyle}>
                    <View style={row}>
                        {this.renderSearch()}
                    </View>
                    {this.props.children}
                </View>
            </View>
        );      
    }

    
}

const styles = {
    row: {
        flexDirection: 'row'
    },
    viewStyle: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        fontSize: moderateScale(20),
        color: 'black',
        fontWeight: 'bold'
    },
    headerTextContainer: {
    },
    actionStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    headerStyle: {
        height: '10%',
        elevation: 2,
        position: 'relative',
    },
    headerIconContainerStyle: {
        paddingHorizontal: moderateScale(10)
    },
    headerIconStyle: {
        height: moderateScale(25),
        width: moderateScale(25),
    },
    searchField: {
        width: '100%',
        height: moderateScale(25),
        fontSize: moderateScale(18),
        marginLeft: moderateScale(10),
        padding: 0
    }
};

export { HeaderWithSearch };
