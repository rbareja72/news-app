import React from 'react';
import {
    View,
    Modal,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

class ActionMenu extends React.PureComponent {

    onBackPress() {
        console.log('hereinmenu');        
    }

    render() {
        const { visible, data, onItemSelect } = this.props;
        const { listContainer, listItemContainer, textStyle, modalView, otherArea } = styles;
        return (    
            <Modal
                onRequestClose={() => onItemSelect(-1)}
                visible={visible}  
                transparent 
            >
                <View style={modalView}>
                    <TouchableWithoutFeedback onPress={() => onItemSelect(-1)}>
                        <View style={otherArea}>
                            <View style={listContainer}>
                                <FlatList
                                    data={data}
                                    renderItem={({ item, index }) => 
                                        <View style={listItemContainer}>
                                            <TouchableOpacity onPress={() => onItemSelect(index)}>
                                                <Text style={textStyle}>{ item.value }</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />                
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        );
    }
}

const styles = {
    modalView: {
        width: '100%',
        height: '100%'
    },
    otherArea: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1
    },
    listItemContainer: {
        backgroundColor: 'white',
        width: moderateScale(200),
        alignSelf: 'flex-end'
    },
    textStyle: {
        fontSize: moderateScale(15),
        paddingVertical: moderateScale(15),
        paddingHorizontal: moderateScale(15),
        color: 'black'
    },
    listContainer: {
        marginTop: moderateScale(50)
    }
};

export { ActionMenu };
