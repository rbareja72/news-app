import { colors } from './../../../Colors.config';

const {
    backButtonColor
} = colors;
export const styles = {
    backButtonContainer: {
        position: 'absolute',
        alignSelf: 'flex-start',
        elevation: 1 
    },
    backButtonTextContainer: {
        paddingHorizontal: '15%'
    },
    backButtonText: {
        color: backButtonColor,   
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
