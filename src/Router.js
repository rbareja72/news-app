import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import NewsList from './components/main/NewsList/NewsList';
import NewsDetail from './components/main/NewsDetail/NewsDetail';
import WebViewComponent from './components/main/WebViewComponent/WebViewComponent';

const AuthStackNavigator = createStackNavigator(
    {
        login: Login,
        register: Register
    },
    {
        initialRouteName: 'login'
    }
);
const MainStackNavigator = createStackNavigator(
    {
        list: NewsList,
        detail: NewsDetail,
        webView: WebViewComponent
    },
    {
        initialRouteName: 'list'
    }
);

const AppNavigator = createSwitchNavigator(
    {
        auth: AuthStackNavigator,
        main: MainStackNavigator
    },
    {
        initialRouteName: 'auth'
    }
);


export default createAppContainer(AppNavigator);
