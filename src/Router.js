import { Easing, Animated, } from 'react-native';  
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import NewsList from './components/main/NewsList/NewsList';
import NewsDetail from './components/main/NewsDetail/NewsDetail';
import WebViewComponent from './components/main/WebViewComponent/WebViewComponent';

const SlideFromRight = (index, position, width) => {
    const inputRange = [index - 1, index, index + 1];
    const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, 0]
    });
    const slideFromRight = { transform: [{ translateX }] };
    return slideFromRight;
};
    
const TransitionConfiguration = () => (
    {
        transitionSpec: {
            duration: 500,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: (sceneProps) => {
            const { layout, position, scene } = sceneProps;
            return SlideFromRight(
                scene.index,
                position,
                layout.initWidth
            );
        }
    }
);


const AuthStackNavigator = createStackNavigator(
    {
        login: Login,
        register: Register
    },
    {
        initialRouteName: 'login',
        navigationOptions: {
            cardStack: {
              gesturesEnabled: false
            },
            gesturesEnabled: false
        },
        gesturesEnabled: false,
        transitionConfig: TransitionConfiguration,
    }
);
const MainStackNavigator = createStackNavigator(
    {
        list: NewsList,
        detail: NewsDetail,
        webView: WebViewComponent
    },
    {
        initialRouteName: 'list',
        navigationOptions: {
            cardStack: {
              gesturesEnabled: false
            },
            gesturesEnabled: false
          },
          gesturesEnabled: false,
          transitionConfig: TransitionConfiguration,
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
