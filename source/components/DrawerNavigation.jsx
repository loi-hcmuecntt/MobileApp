import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import CustomDrawer from './CustomDrawer';
import RestaurantsScreen from '../screen/RestaurentsScreen';
import HistoryScreen from '../screen/HistoryScreen';
import ProfileScreen from '../screen/ProfileScreen';
import ChangeEmailScreen from '../screen/ChangeEmailScreen';
import ChangePasswordScreen from '../screen/ChangePasswordScreen';
import AboutScreen from '../screen/AboutScreen';

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
        toast.show("Not authorized, please log in !", {
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
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      toast.show("Logged out successfully!", {
        type: "success",
        placement: "bottom",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      toast.show("Error logging out!", {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      });
      console.error(error);
    }
  }

  return (
    <Drawer.Navigator
      initialRouteName="Restaurents"
      screenOptions={{ headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}
    >
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Restaurents" 
        component={RestaurantsScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="restaurant-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="History" 
        component={HistoryScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="sync-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="person-outline" size={22} color={color}/>
          ),
        }}
      />
      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Change Email" 
        component={ChangeEmailScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="mail-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="Change Password" 
        component={ChangePasswordScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="lock-closed-outline" size={22} color={color}/>
          ),
        }}
      />

      <Drawer.Screen 
        initialParams={{user: route.params.user}}
        name="About" 
        component={AboutScreen} 
        options={{
          drawerIcon:({color}) => (
            <Ionicons name="information-circle-outline" size={22} color={color}/>
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={() => null} // Empty component, logout will be triggered manually
        options={{
          drawerLabel: 'Logout',
          drawerIcon: ({ color }) => (
            <Ionicons name="log-out-outline" size={22} color={color} />
          ),
          drawerItemStyle: {
            marginTop: 100, // Make it visually separated
          },
          unmountOnBlur: true, // Prevent component from staying mounted
        }}
        listeners={{
          focus: handleLogout, // Trigger logout on drawer item focus
        }}
      />

    </Drawer.Navigator>
  )
}

export default DrawerNavigation