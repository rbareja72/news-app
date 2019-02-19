import { colors } from './../../Colors.config';

const {
    errorMessageColor,
    errorMessageContainerBorderColor,
    errorMessageContainerBackgroundColor
} = colors;
export const styles = {
    errorMessage: {
        color: errorMessageColor,
        fontSize: 18,
        padding: 10,
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
    }
};
