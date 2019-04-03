import { colors } from './../../../Colors.config';
import { moderateScale } from 'react-native-size-matters';

const {
    backButtonColor
} = colors;
export const styles = {
    backButtonContainer: {
        position: 'absolute',
        alignSelf: 'flex-start',
        elevation: 1 ,
        paddingTop: moderateScale(10)
    },
    backButtonTextContainer: {
        paddingHorizontal: '15%'
    },
    backButtonStyle: {
        width: moderateScale(25),
        height: moderateScale(25),
    },
    textContainer: {
        padding: '2%',
    },
    imageStyle: {
        height: undefined,
        width: '100%',
        aspectRatio: 135 / 76 
    },
    shareButtonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end',
        elevation: 1,
    },
    shareButtonTextContainer: {
        paddingVertical: 10
    },
    shareButtonText: {
        color: backButtonColor,
    },
};
