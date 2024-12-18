import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios'
import { API } from '../configs';

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const onSignupPressed = async () => {
    setLoading(true)
    if(!name) {
      toast.show("Name is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!surname) {
      toast.show(" Surname is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!phone) {
      toast.show("Phone number is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!address) {
      toast.show("address is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!email) {
      toast.show("Email is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!password) {
      toast.show("Password is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }else {
      await axios.post(`${API}/auth/register`, {
        name: name,
        surname:surname,
        phone: phone,
        address:address,
        email:email,
        password: password
      }).then((result) => {
        console.log(result.data)
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setName("");
          setSurname("");
          setPhone("");
          setAddress("");
          setEmail("");
          setPassword("");
          navigation.navigate("LoginScreen");
        }else {
          toast.show(result.data.message, {
            type: "danger",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
        }
      })
    }
  }

  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' 
    }}>
      <View style= {styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}></Text>
        </View>
        <View style={styles.main} >
          <Text style={{fontSize: 30, color: '#000', fontWeight: 'bold'}}>
            Tạo tài khoản mới
          </Text>
          <View style={styles.inputView}>
            <View style={styles.fullname}>
              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tên"
                value={name}
                onChangeText={text => setName(text)}
              />

              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Họ"
                value={surname}
                onChangeText={text => setSurname(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Số điện thoại"
              value={phone}
              onChangeText={text => setPhone(text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Địa chỉ"
              value={address}
              onChangeText={text => setAddress(text)}
            />
            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              secureTextEntry={true} 
              mode="outlined"
              label="Mật khẩu"
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <Button 
            mode="contained" 
            loading={loading}
            buttonColor="#1687FF"
            onPress={ () => onSignupPressed()}
            style={styles.button}
          >
            Đăng ký
          </Button>
          <View style={styles.row}>
          <Text>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#009387'
  },
  header: {
    marginVertical: 20,
    marginHorizontal:20,
    width:'100%',
    height:100
  },
  title:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  inputView:{
    marginTop:50
  },
  fullname: {
    flexDirection:'row',
  },
  mininput:{
    width:'49%',
    marginRight:5,
    marginBottom: 10,
  },

  input:{
    marginBottom:10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  button: {
    height: 60,
    marginTop: 20,
    justifyContent: "center",
    borderRadius: 30,
    marginTop:10,
    margin:'1%'
  },
  row: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10,
  },
  link: {
    fontWeight: 'bold',
    color: '#1687FF',
  },
})

export default RegisterScreen