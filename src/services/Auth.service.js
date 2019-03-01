import { post } from './Network.service';
import { Urls } from './../Apis.config';

export const signin = async (email, password) => {
    let response;
    try {
        response = await post(Urls.login, { email, password });
        return response;
    } catch (err) {
        throw err;
    }
};

export const signup = async (email, password) => {
    let response;
    try {
        response = await post(Urls.register, { email, password });
        return response;
    } catch (err) {
        throw err;
    }
    
};
