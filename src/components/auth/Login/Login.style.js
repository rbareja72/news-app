import { moderateScale } from 'react-native-size-matters';

export const styles = {
    googleSigninButton: {
        width: moderateScale(192),
        height: moderateScale(48),
        marginTop: moderateScale(20)
    },
    facebookSigninButtonContainer: {

    },
    facebookSigninButtonText: {
        backgroundColor: '#4267b2',
        color: 'white',
        padding: moderateScale(10),
        marginTop: moderateScale(10)
    },
    loaderContainer: {
        elevation: 2,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    majorContainer: { height: '100%' }
};
