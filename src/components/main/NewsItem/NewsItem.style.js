import { moderateScale } from 'react-native-size-matters';

export const styles = {
    imageStyle: {
        width: moderateScale(75),
        height: moderateScale(75),
    },
    parentContainer: {
        padding: '2%'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    }
};
