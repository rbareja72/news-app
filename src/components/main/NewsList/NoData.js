import React from 'react';
import { View, Image } from 'react-native';

const NoData = () => (
        <View>
            <Image
                source={require('./../../../images/bg.jpeg')}
                style={{
                    flex: 1
                }}
            />
        </View>
    );
export default NoData;
