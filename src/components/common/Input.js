import React from 'react';
import { TextInput, View, Text } from 'react-native';

class Input extends React.Component {

    componentDidMount(){
        if (this.props.onRef != null) {
            this.props.onRef(this);
        }
    }
    
    focus() {
        this.textInput.focus();
    }

    render() {
        const {
            label,
            value,
            onChangeText,
            placeholder,
            secureTextEntry,
            onSubmitEditing,
            returnKeyType,
            blurOnSubmit,
        } = this.props;
        const { inputStyle, labelStyle, containerStyle } = styles;
        return (
            <View style={[containerStyle, this.props.containerStyle]}>
                <Text style={[labelStyle, this.props.labelStyle]}>{label}</Text>
                <TextInput
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    placeholder={placeholder}
                    style={[inputStyle, this.props.inputStyle]}
                    value={value}
                    returnKeyType={returnKeyType}
                    ref={(input) => { this.textInput = input; }}
                    blurOnSubmit={blurOnSubmit}
                    onSubmitEditing={onSubmitEditing}
                    onChangeText={onChangeText}
                />
            </View>
        );
    }
}
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};
export { Input };
