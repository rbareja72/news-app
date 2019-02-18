import { post } from './Network.service';

export const signin = async (email, password) => {
    const url = 'https://reqres.in/api/login';
    const response = await post(url, { email, password });
    return response;
};

export const signup = async (email, password) => {
    const url = 'https://reqres.in/api/register';
    const response = await post(url, { email, password });
    return response;
};
