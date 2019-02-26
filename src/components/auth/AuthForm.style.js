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
    }
};
