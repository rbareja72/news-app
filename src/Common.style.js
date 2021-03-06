import { moderateScale } from 'react-native-size-matters';
import { colors } from './Colors.config';

const { 
    borderBottomColor,
    borderColor,
    modalThemeColor,
    appThemeColor,
    foregroundColor,
    headingColor,
    textShadowColorConfig,
    boxShadowColorConfig,
    linkColor
} = colors;
const commonStyles = {
    fontSmall: {
        fontSize: moderateScale(15),  
    },
    fontLarge: {
        fontSize: moderateScale(20)
    },
    fontXLarge: {
        fontSize: moderateScale(30)
    },
    textShadow: {
        textShadowColor: textShadowColorConfig,
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    boxShadow: {
        shadowColor: boxShadowColorConfig,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
    },
    heading: {
        fontSize: moderateScale(20),
        fontWeight: 'bold'
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor
    },
    linkBlue: {
        color: linkColor,
        fontSize: 15,
        textDecorationLine: 'underline'
    },
    circle: {
        borderRadius: moderateScale(50)
    },
    underline: {
        textDecorationLine: 'underline'
    },
    rightAlign: {
        alignSelf: 'flex-end'
    },
    border: {
        borderWidth: 1,
        borderColor
    },
    horizontalCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    verticalCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    middle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerSelf: {
        alignSelf: 'center'
    },
    modalTheme: {
        backgroundColor: modalThemeColor,
        color: foregroundColor
    },
    appTheme: {
        backgroundColor: appThemeColor,
        color: foregroundColor
    },
    textDefault: {
        color: foregroundColor
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    fill: {
        flex: 1
    },
    headingColor: {
        color: headingColor
    }
};

export { commonStyles };
