// import libraries for making a component 
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import { Text, View } from 'react-native';

//make a component

const Header = (props) => {
    const { textStyle, viewStyle, actionStyle, headerTextContainer } = styles;
    return (
        <View style={viewStyle}>
            <View style={headerTextContainer}>
                <Text style={textStyle}>{props.headerText}</Text>
            </View>
            <View style={actionStyle}>
                { props.children }
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        elevation: 2,
        position: 'relative'

    },
    textStyle: {
        fontSize: moderateScale(20),
        color: 'black',
        fontWeight: 'bold',

    },
    headerTextContainer: {
    },
    actionStyle: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    }
};

//make the component available to other parts of the app

export { Header };
