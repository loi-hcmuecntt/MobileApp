import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux';
import SplashScreen  from "./source/screen/SplashScreen";
import StartScreen  from "./source/screen/StartScreen";
import LoginScreen from './source/screen/LoginScreen';
import RegisterScreen from './source/screen/RegisterScreen';
import MenuItemScreen from './source/screen/MenuItemScreen';
import OrderDetailScreen from './source/screen/OrderDetailScreen';
import CartScreen from './source/screen/CartScreen';
import CheckoutScreen from './source/screen/CheckoutScreen';
import RestaurantsScreen from './source/screen/RestaurantsScreen';
import DrawerNavigation from './source/components/DrawerNavigation';


import store from "./source/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="Hello" component={DrawerNavigation} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="MenuItemScreen" component={MenuItemScreen} />
            <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
            <Stack.Screen name="CartScreen" component={CartScreen} />
            <Stack.Screen name="RestaurantsScreen" component={RestaurantsScreen} />
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

