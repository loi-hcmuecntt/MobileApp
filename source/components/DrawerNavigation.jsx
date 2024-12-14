import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import RestaurantsScreen from '../screen/RestaurantsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({ navigation }) => {
  
  const toast = useToast();
  const route = useRoute();

  useEffect(()=> {
    CheckToken();
  }, [])

  const CheckToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value == null || value == undefined ) {
        toast.show("Chưa đăng nhập!", {
          type: "danger",
          placement:"bottom",
          duration: 4000,
          offset: 30,
          animationType: "zoom-in"
        })
        navigation.navigate("LoginScreen");
      }
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Restaurants"
      screenOptions={{ headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Restaurants" 
        component={RestaurantsScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="restaurant-outline" size={22} color={color}/>
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigation