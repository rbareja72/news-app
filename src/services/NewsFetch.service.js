import { get } from './Network.service';
import { Urls } from './../Apis.config';

export const fetchNews = async (page = 1, q = '') => {
    let response;
    try {
        if (q !== '') {
            response = await get(`${Urls.newsEverything}&page=${page}&q=${q}`);
        } else {
            response = await get(`${Urls.newsFetch}&page=${page}`);
        }        
        return { news: response.articles, totalNewsCount: response.totalResults };
    } catch (err) {
        throw err;
    }
};
