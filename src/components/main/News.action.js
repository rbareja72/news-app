import { fetchNews } from './../../services/NewsFetch.service';
import { FETCH_NEWS } from './Types';

export const getNews = async (dispatch) => {
    let news;
    try {
        news = await fetchNews();
        if (news) {
            dispatch({
                type: FETCH_NEWS,
                payload: news
            });
        }        
    } catch (err) {
        throw err;
    }
};
