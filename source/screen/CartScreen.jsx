import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react'
import { IconButton, MD3Colors, Badge, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux'
import { cartTotalPriceSelector, cartTotalSelector } from "../redux/selector";
import {
  increment,
  decrement,
  clear,
  removeItem,
} from "../redux/features/CartSlice";
import { useRoute } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { HOST } from '../configs';

const CartScreen = ({ navigation }) => {

  const [visible, setVisible] = useState(true);

  const cart = useSelector((state) => state.cart);

  const totalPrice = useSelector(cartTotalPriceSelector);
  const total = useSelector(cartTotalSelector);

  const dispatch = useDispatch();

  const route = useRoute();

  const toast = useToast()


  return (
    <ScrollView contentContainerStyle={{ 
      justifyContent: 'center' ,
      flexGrow: 1
    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <View style={{ flex: 1 }}>
            <Text style={{fontSize:20, fontWeight:'bold'}}> Giỏ hàng</Text>
          </View>
          <IconButton
            icon="basket-off"
            color='#22A39F'
            size={30}
            onPress={ () => {
              dispatch(clear())
              toast.show("Giỏ hàng đang trống", {
                type: "info",
                placement:"bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
              })
            
            }}
          />
          <View>
            <Badge visible={visible} style={styles.badge}>{total}</Badge>
            <IconButton
              icon="shopping"
              color={MD3Colors.blue500}
              size={30}
            />
          </View>
        </View>
        {
          cart.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.card} 
            >
              <Image style={styles.cardimage} source={{uri: HOST+item.image}} />
              <View style={styles.cardcontent}>
                <View style={styles.carddetails}>
                  <View 
                    style={{ 
                      flexDirection: "row", 
                      alignItems:'center',
                      marginVertical:5
                    }}
                  >
                    <MaterialCommunityIcons 
                      name="chef-hat" 
                      color='#00ABB3' 
                      size={15}
                    />
                    <Text style={{fontSize:20, fontWeight:'bold', color: '#00ABB3', marginLeft:5} }>{item.name}</Text>
                  </View>
      
                  <View 
                    style={{ 
                      flexDirection: "row", 
                      alignItems:'center',
                      marginVertical:5
                    }}
                  >
                    <Ionicons 
                      name="pricetag-outline" 
                      color='#3C4048'
                      size={15}
                    />
                    <Text style={{fontSize:15, color: '#3C4048', marginLeft:5} }>{item.quantity+' x ' +item.price} VND</Text>
                  </View>

                  <View 
                    style={{ 
                      flexDirection: "row", 
                      alignItems:'center',
                      marginVertical:5
                    }}
                  >
                    <IconButton
                      icon="minus"
                      color={MD3Colors.blue500}
                      size={20}
                      onPress={() => {
                        if (item.quantity === 1) {
                          dispatch(removeItem(item._id));

                          console.log("removed");
                          return;
                        } else {
                          dispatch(decrement(item._id));
                        }
                      }}
                    />
                    <View style={{width:100, height:30, backgroundColor:'#dadada', borderRadius:10}}>
                      <Text style={{fontSize:20, textAlign:'center'}}>{item.quantity}</Text>
                    </View>
                    <IconButton
                      icon="plus"
                      color={MD3Colors.blue500}
                      size={20}
                      onPress={() => dispatch(increment(item._id))}
                    />
 
                  </View>

                  <View 
                    style={{ 
                      flexDirection: "row", 
                      alignItems:'center',
                      marginVertical:5
                    }}
                  >
                    <MaterialCommunityIcons 
                      name="equal" 
                      color='#B2B2B2'
                      size={15}
                    />
                    <Text style={{fontSize:20, color: '#B2B2B2', marginLeft:5, fontWeight: 'bold'} }>{item.quantity * item.price} VND</Text>
                  </View>

                </View>
                <View style={styles.cardaction}>
                <IconButton
                  icon="trash-can-outline"
                  color={MD3Colors.red500}
                  size={40}
                  onPress={() => { dispatch(removeItem(item._id))}}
                />
              </View>
              </View>
            </TouchableOpacity>
          ))
        }
      </View>
      <View style={styles.priceView}>
        <View style={{alignItems:'center', paddingVertical:20}}>
          <Text 
            style={{
              fontSize:25, 
              fontWeight:'bold', 
              color: MD3Colors.black500, 
              marginLeft:5 
            }}
          >
            Tổng: {totalPrice} VND
          </Text>
        </View>

        <View style={styles.btnView}>
          <Button 
            mode="contained" 
            buttonColor="#3C4048"
            onPress={() => navigation.navigate("RestaurantsScreen", { restaurant:route.params.restaurant, user:route.params.user})}
            style={[styles.button, styles.leftBtn]}
          >
            <Ionicons name="chevron-back-outline" color={MD3Colors.white} size={20} />
          </Button>
          <Button 
            mode="contained" 
            buttonColor="#00ABB3"
            compact={true}
            onPress={() => navigation.navigate("CheckoutScreen", { restaurant:route.params.restaurant, user:route.params.user})}
            style={[styles.button, styles.rightBtn]}
          >
            <Ionicons name="checkmark-outline" color={MD3Colors.white} size={20} />
          </Button>
        </View>
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
    marginBottom:10,
    backgroundColor:'#FFF',
    minHeight:100,
    padding:15,
    borderRadius:10,
    borderWidth:1,
    borderColor:"#dadada"
  },
  cardcontent:{
    flexDirection:'row',
    alignItems: 'center'
  },
  cardimage:{
    width:'100%',
    height:150,
    borderRadius:10
  },
  carddetails:{
    flex:1,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 2,
  },
  priceView:{
    margin:20,
    backgroundColor:'#FFF',
    borderRadius:10,
    borderColor:"#dadada",
  },
  btnView:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },  
  button: {
    width:"30%",
    height: 60,
    justifyContent: "center",
  },
  leftBtn:{
    borderRadius:10,
  },
  rightBtn:{
    borderRadius:10,
  },
})
export default CartScreen