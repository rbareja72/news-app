import { moderateScale } from 'react-native-size-matters';

export const styles = {
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
    }
};
