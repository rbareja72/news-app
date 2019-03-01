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
        return await AsyncStorage.setItem(
            key,
            value
        );
    } catch (e) {
        throw e;
    }
};

const deleteItem = async (key) => {
    try {
        return await AsyncStorage.removeItem(key);
    } catch (e) {
        throw e;
    }
};

export { getItem, setItem, deleteItem };
