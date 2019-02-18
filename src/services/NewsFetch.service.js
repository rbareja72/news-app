import { get } from './Network.service';
import { Apis } from './../Apis.config';

export const fetchNews = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${Apis.news}`;
    const response = await get(url);
    return response.articles;
};
