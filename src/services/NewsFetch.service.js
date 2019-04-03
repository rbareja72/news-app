import { get } from './Network.service';
import { Urls } from './../Apis.config';

export const fetchNews = async (page = 1) => {
    let response;
    try {
        response = await get(`${Urls.newsFetch}&page=${page}`);
        return response.articles;
    } catch (err) {
        throw err;
    }
};
