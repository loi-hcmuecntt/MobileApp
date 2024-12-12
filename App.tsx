import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux';
import SplashScreen  from "./src/screen/SplashScreen";
import StartScreen  from "./src/screen/StartScreen";
import LoginScreen from './src/screen/LoginScreen';
import ResetPasswordScreen from './src/screen/ResetPasswordScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import MenuItemScreen from './src/screen/MenuItemScreen';
import OrderDetailScreen from './src/screen/OrderDetailScreen';
import CartScreen from './src/screen/CartScreen';
import CheckoutScreen from './src/screen/CheckoutScreen';
import RestaurentsScreen from './src/screen/RestaurentsScreen';
import ProfileScreen from './src/screen/ProfileScreen';


import { DrawerNavigation } from './src/components'
import CustomDrawer from './src/components/CustomDrawer'
import store from "./src/redux/store";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator

export default function App() : React.JSX.Element {
  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="Hello" component={DrawerNavigation} />
            <Stack.Screen name="MenuItemScreen" component={MenuItemScreen} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="RestaurentsScreen" component={RestaurentsScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="CustomDrawer" component={CustomDrawer} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

