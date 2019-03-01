import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { TextField } from 'react-native-material-textfield';

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
            secureTextEntry,
            onSubmitEditing,
            returnKeyType,
            textColor,
            tintColor,
            baseColor,
            blurOnSubmit,
        } = this.props;
        const { inputStyle, containerStyle } = styles;
        return (
            <View style={containerStyle}>
                <TextField
                    label={label}
                    autoCorrect={false}
                    secureTextEntry={secureTextEntry}
                    textColor={textColor}
                    tintColor={tintColor}
                    baseColor={baseColor}
                    fontSize={16}
                    style={[inputStyle, this.props.inputStyle]}
                    value={value}
                    //placeholderTextColor={this.props.placeholderTextColor}
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
        flex: 1
    },
    containerStyle: {
        flex: 1
    }
};
export { Input };
