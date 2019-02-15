import { colors } from './Colors.config';

const { 
    borderBottomColor,
    borderColor,
    modalThemeColor,
    appThemeColor,
    foregroundColor,
    headingColor
} = colors;
const commonStyles = {
    fontSmall: {
        fontSize: 15,  
    },
    fontLarge: {
        fontSize: 20
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor
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
    fill: {
        flex: 1
    },
    headingColor: {
        color: headingColor
    }
};

export { commonStyles };
