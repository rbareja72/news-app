import { createAppContainer, createStackNavigator } from 'react-navigation';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';

const AppNavigator = createStackNavigator(
    {
        login: Login,
        register: Register
    },
    {
        initialRouteName: 'login'
    }
);
export default createAppContainer(AppNavigator);
