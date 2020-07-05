import { fetchNews } from './../../services/NewsFetch.service';
import { FETCH_NEWS, TOGGLE_ACTION_MENU, REFRESH_NEWS, FETCH_MORE_NEWS, NEXT_PAGE, CLEAR_NEWS } from './Types';

export const getNews = async (dispatch, page = 1, q = '') => {
    try {
        const { news, totalNewsCount } = await fetchNews(page, q);
        console.log(news);
        console.log(page);
        
        if (news) {
            if (page > 1) {
                dispatch({
                    type: FETCH_MORE_NEWS,
                    payload: news
                });
                if (news.length > 0) {
                    dispatch({
                        type: NEXT_PAGE
                    });
                }                
            } else {
                dispatch({
                    type: FETCH_NEWS,
                    payload: { news, totalNewsCount, q }
                });
            }            
        }        
    } catch (err) {
        throw err;
    }
};

export const toggleMenu = (dispatch, visibility) => {
    dispatch({
        type: TOGGLE_ACTION_MENU,
        payload: visibility
    });
};

export const refreshNews = (dispatch, q) => {
    dispatch({
        type: REFRESH_NEWS
    });
    getNews(dispatch, 1, q);
};

export const fetchMoreNews = (dispatch, page, q) => {
    console.log('here');
    
    getNews(dispatch, page + 1, q);
};

export const clearNews = (dispatch) => {
    dispatch({
        type: CLEAR_NEWS
    });
};
