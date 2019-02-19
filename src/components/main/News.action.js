import { fetchNews } from './../../services/NewsFetch.service';
import { FETCH_NEWS } from './Types';

export const getNews = async (dispatch) => {
    const news = await fetchNews();
    dispatch({
        type: FETCH_NEWS,
        payload: news
    });
};
