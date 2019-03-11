import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { colors } from './../../Colors.config';

const {
    errorMessageColor,
    errorMessageContainerBorderColor,
    errorMessageContainerBackgroundColor,
    textColor
} = colors;
export const styles = {
    errorMessage: {
        color: errorMessageColor,
        fontSize: moderateScale(18),
        padding: '2%',
        alignSelf: 'center'
    },
    errorMessageContainer: {
        backgroundColor: errorMessageContainerBackgroundColor,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: errorMessageContainerBorderColor,
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 5
    },
    textContainerStyle: {
        height: verticalScale(50)
    },
    transparentBackground: {
        backgroundColor: 'rgba(0,0,0,0)'
    },
    noBorder: {
        borderColor: 'rgba(0,0,0,0)',
        shadowOpacity: 0,       
    },
    buttonStyle: {
        borderColor: 'white',
        color: 'white'
    }, 
    textColor: {
        color: textColor
    },
    dropDownIcon: {
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'white',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        marginTop: 20,
        marginRight: 10,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
    },
    
    inputAndroid: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1
    },
    inputIOS: {
        color: 'white',
        borderColor: 'white',
        borderWidth: 1,
        height: 40,
        paddingLeft: 10
    }
};
