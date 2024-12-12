import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button, Text, MD3Colors } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios'
import { API } from '../configs';
import { Header } from '../components';
import styles from '../style'

const ProfileScreen = ({ navigation }) => {

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");

  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const route = useRoute();
  const onSubmitPressed = async () => {
    setLoading(true)
    if(!nom) {
      toast.show("Name is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!prenom) {
      toast.show(" Surname is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!telephone) {
      toast.show("Phone number is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else if(!adresse) {
      toast.show("adress is required !", {
        type: "danger",
        placement:"bottom",
        duration: 4000,
        offset: 30,
        animationType: "zoom-in",
      })
      setLoading(false)
    }
    else {
      await axios.put(`${API}/auth/profile/${route.params.user._id}`, {
        nom: nom,
        prenom:prenom,
        telephone: telephone,
        adresse:adresse,
      }).then((result) => {
        if(result.data.success) {
          toast.show(result.data.message, {
            type: "success",
            placement:"bottom",
            duration: 4000,
            offset: 30,
            animationType: "zoom-in"
          })
          setLoading(false);
          setNom("");
          setPrenom("");
          setTelephone("");
          setAdresse("");
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
      justifyContent: 'center' ,
      flexGrow: 1
    }}>
      <View style= {styles.container}>
        <Header title="Profile" />
        <View style={styles.main} >
          <View style={styles.inputView}>
            <View style={styles.fullname}>
              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Tên"
                value={nom}
                onChangeText={text => setNom(text)}
              />

              <TextInput
                style={styles.mininput}
                activeOutlineColor="#1687FF"
                mode="outlined"
                label="Họ"
                value={prenom}
                onChangeText={text => setPrenom(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Số điện thoại"
              value={telephone}
              onChangeText={text => setTelephone(text)}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              activeOutlineColor="#1687FF"
              mode="outlined"
              label="Địa chỉ"
              value={adresse}
              onChangeText={text => setAdresse(text)}
            />
          </View>
          <Button 
            mode="contained" 
            loading={loading}
            color="#00ABB3"
            onPress={onSubmitPressed}
            style={styles.button}
          >
            Submit
          </Button>
          <View style={styles.infoBubble}>
            <Ionicons name="information-circle-sharp" size={35} color={MD3Colors.red500}/>
            <Text style={styles.info}>Bạn sẽ được chuyển đến trang <Text style={styles.link}>đăng nhập</Text> sau khi cập nhật mật khẩu</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen