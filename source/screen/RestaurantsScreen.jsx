import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useCallback} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Searchbar, Chip, IconButton, MD3Colors, Avatar, Badge} from 'react-native-paper';
import axios from 'axios'
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { API, HOST } from '../configs';
import { cartTotalSelector } from "../redux/selector";

const RestaurantsScreen = ({ navigation }) => {

  const [restaurants, setRestaurants] = useState([])
  const [backup, setBackup] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const cart = useSelector((state) => state.cart);

  const [visible, setVisible] = useState(true);

  const route = useRoute();

  const total = useSelector(cartTotalSelector);

  useFocusEffect(
    useCallback(() => {
      fetchAPI()
      return () => {
        console.log('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, [])
  );

  const fetchAPI = async () => {
    await axios.get(`${API}/restaurants/get`)
    .then((result) => {
      if(result.data.success){
        setRestaurants(result.data.restaurants)
        setBackup(result.data.restaurants)
      }
    })
  }

  function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
    return str
  }

  
  const onChangeSearch = (text) => {
    const query = backup.filter((item) => {
      const item_data = `${xoa_dau(item.name.toUpperCase())}`;
      const text_data = xoa_dau(text.toUpperCase());
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(text);
    setRestaurants(query);
    console.log(query);
  }

  const searchBySpeciality = (Speciality) => {
    if(Speciality == 'all' ){
      setRestaurants(backup)
    }else {
      console.log(Speciality)
      const query = backup.filter((item) => {
        const item_data = `${item.speciality.toUpperCase()}`;
        const text_data = Speciality.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setRestaurants(query);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
            <Text style={{fontSize:20, fontWeight:'bold'}}> Xin chào {route.params.user.name}</Text>
            </TouchableOpacity>
            <View 
              style={{ 
                flexDirection: "row", 
                marginLeft:5,
                alignItems:'center' 
              }}
            >
            </View>
          </View>
          <View>
            <Badge visible={visible} style={styles.badge}>{total}</Badge>
            <IconButton
              icon="shopping"
              color={MD3Colors.blue500}
              onPress={() => navigation.navigate('CartScreen', { restaurant:route.params.restaurant, user:route.params.user})}
              size={30}
            />
          </View>

        </View>

        <Searchbar
          placeholder="Tìm kiếm"
          style={{
            marginVertical:15,
            padding:8,
            borderRadius:30,
            backgroundColor:'#e3e3e3'
          }}
          onChangeText={(text) => onChangeSearch(text)}
          value={searchQuery}
        />
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <View style={{ flexDirection: "row"}}>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/resetfood.jpg')} />}
              onPress={() => searchBySpeciality("all")} 
              style={{height:40, marginRight:10}}
            >
              Tất cả
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/com-tam.jpg')} />}
              onPress={() => searchBySpeciality("Com")} 
              style={{height:40, marginRight:10}}
            >
              Cơm
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/pho.jpg')} />}
              onPress={() => searchBySpeciality("Pho")} 
              style={{height:40, marginRight:10}}
            >
              Phở
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/mi.jpg')} />}
              onPress={() => searchBySpeciality("Mi")} 
              style={{height:40, marginRight:10}}
            >
              Mì
            </Chip>

            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/Hombourger.jpg')} />}
              onPress={() => searchBySpeciality("Fastfood")} 
              style={{height:40, marginRight:10}}
            >
              Thức ăn nhanh
            </Chip>
            <Chip 
              mode='outlined' 
              avatar={<Avatar.Image size={24} source={require('../assets/do-uong.jpg')} />}
              onPress={() => searchBySpeciality("Drinks")} 
              style={{height:40, marginRight:10}}
            >
              Đồ uống
            </Chip>
          </View>
        </ScrollView>
        {
          restaurants.map((restaurant, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
              onPress={() => navigation.navigate('MenuItemScreen', { restaurant:restaurant, user:route.params.user })}
            >
              <Image source={{uri: HOST+restaurant.image}} style={{width:"100%",height:200}}/>
              <Text style={{ fontSize:20, fontWeight:'bold',marginVertical:5}}>{restaurant.name} </Text>
              <View 
                style={{
                  flexDirection: "row", 
                  alignItems:'center' ,
                  marginVertical:5
                }} 
              >
                <Ionicons 
                  name="location-outline" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  {restaurant.address}, {restaurant.state}
                </Text>
                <Text>  </Text>
                <Ionicons 
                  name="star" 
                  color="orange" 
                  size={15}
                />
                <Text            
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}>
                  5
                </Text>
              </View>

              <View 
                style={{
                  flexDirection: "row", 
                  alignItems:'center' 
                }} 
              >
                <Ionicons 
                  name="call-outline" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  {restaurant.phone}
                </Text>
                <Text>  </Text>
                <MaterialCommunityIcons 
                  name="chef-hat" 
                  color="gray" 
                  size={15}
                />
                <Text 
                  style={{
                    color:"gray", 
                    marginLeft:5
                  }}
                >
                  Món ăn : {restaurant.speciality}
                </Text>
                <Text>  </Text>
              </View>

            </TouchableOpacity>
          ))
        }

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:45,
    paddingHorizontal:20,
  },
  card:{
    width:'100%',
    marginVertical:20,
    backgroundColor:'#FFF',
    minHeight:250,
    padding:15,
    borderRadius:10,
    borderColor:"#000"
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 2,
  },

})

export default RestaurantsScreen