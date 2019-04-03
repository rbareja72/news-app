import { fetchNews } from './../../services/NewsFetch.service';
import { FETCH_NEWS, TOGGLE_ACTION_MENU, REFRESH_NEWS, FETCH_MORE_NEWS, NEXT_PAGE } from './Types';

export const getNews = async (dispatch, page = 1) => {
    let news;
    try {
        news = await fetchNews(page);   
        if (news) {
            if (page > 1) {
                dispatch({
                    type: FETCH_MORE_NEWS,
                    payload: news    
                });
                dispatch({
                    type: NEXT_PAGE
                });
            } else {
                dispatch({
                    type: FETCH_NEWS,
                    payload: news
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

export const refreshNews = (dispatch) => {
    dispatch({
        type: REFRESH_NEWS
    });
    getNews(dispatch);
};

export const fetchMoreNews = (dispatch, page) => {
    getNews(dispatch, page + 1);
};
