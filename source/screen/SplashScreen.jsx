import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator, MD3Colors } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('StartScreen')
    },3000)
  })
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.image}/>
      <ActivityIndicator animating={true} color={MD3Colors.primary99} size='large'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#009387',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 150,
    height: 150,
    borderRadius:75,
    marginBottom:100,
  }
})

export default SplashScreen