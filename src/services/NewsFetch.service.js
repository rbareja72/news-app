import { get } from './Network.service';
import { Urls } from './../Apis.config';

export const fetchNews = async () => {
    let response;
    try {
        response = await get(Urls.newsFetch);
        return response.articles;
    } catch (err) {
        throw err;
    }
};
