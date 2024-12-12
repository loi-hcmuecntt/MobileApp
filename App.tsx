import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux';
import SplashScreen  from "./source/screen/SplashScreen";
import StartScreen  from "./source/screen/StartScreen";
import LoginScreen from './source/screen/LoginScreen';
import ResetPasswordScreen from './source/screen/ResetPasswordScreen';
import RegisterScreen from './source/screen/RegisterScreen';
import MenuItemScreen from './source/screen/MenuItemScreen';
import OrderDetailScreen from './source/screen/OrderDetailScreen';
import CartScreen from './source/screen/CartScreen';
import CheckoutScreen from './source/screen/CheckoutScreen';
import RestaurentsScreen from './source/screen/RestaurentsScreen';
import ProfileScreen from './source/screen/ProfileScreen';


import { DrawerNavigation } from './source/components'
import CustomDrawer from './source/components/CustomDrawer'
import store from "./source/redux/store";
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

