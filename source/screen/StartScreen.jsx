import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const StartScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.footer} >
        <Text style={styles.title}>
          Ứng dụng gọi món ăn bởi Nhóm 18
        </Text>
        <View style={styles.btnView}>
          <Button 
            mode="contained" 
            buttonColor="#1687FF"
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.button}
          >
            Đăng nhập
          </Button>

          <Button 
            mode="contained" 
            buttonColor="#1687FF"
            onPress={() => navigation.navigate("RegisterScreen")}
            style={styles.button}>
            Đăng ký
          </Button>
        </View>
      </View>
    </View>
  )
}
const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius:height_logo / 2,

  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    color: 'grey',
    marginTop:5
  },
  btnView: {
    flexDirection:'row',
  },
  button: {
    width:'48%',
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:30,
    margin:'1%'
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
})

export default StartScreen