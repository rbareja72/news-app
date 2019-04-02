import PushNotification from 'react-native-push-notification';
import BackgroundFetch from 'react-native-background-fetch';

const NotificationTaskService = async () => {
    const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=23b7b63c2e864d36beaf72e531b1d4a1&pageSize=1';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const news = await response.json();  
    try {
        PushNotification.localNotification({
            message: news.articles[0].title,
            title: 'Latest News',
            data: JSON.stringify(news.articles[0])
        });
    } catch (e) {
        PushNotification.localNotification({
            message: e.message
        });
    } finally {
        BackgroundFetch.finish();
    }
};

export default NotificationTaskService;
