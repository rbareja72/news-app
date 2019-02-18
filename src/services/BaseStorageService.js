import { AsyncStorage } from 'react-native';

const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {            
            return value;
        }
    } catch (error) {
        return null;   
    }
};

const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(
            key,
            value
        );
    } catch (e) {}
};

export { getItem, setItem };
