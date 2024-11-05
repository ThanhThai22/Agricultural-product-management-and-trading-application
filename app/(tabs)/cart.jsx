import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CartItem from '../../components/Cart/CartItem';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { router, useRouter } from 'expo-router';
// import CartItem from './CartItem'; // Đường dẫn đến component CartItem


export default function Cart ({navigation}) {
  const {user} = useUser();
  const userId = user?.primaryEmailAddress?.emailAddress;
  const router = useRouter();


  const handleDeleteCart = async () => {
    if (!cartData) return;

    try {
      deleteCartItem(cartData.id)
      setCartData(null); // Đặt dữ liệu giỏ hàng thành null
      Alert.alert("Thông báo", "Xóa giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      Alert.alert("Thông báo", "Có lỗi xảy ra khi xóa giỏ hàng.");
    }
  };
  
  const handleShipInfo = () => {
    // navigation.navigate("ShippingInfo");
    router.push("/ShippingInfo");
  }

  useEffect(()=>{
    <CartItem/>
  });
  return (
    <View style={styles.container}>
        <Text style={styles.textHeader}>Giỏ hàng của bạn...</Text>
        <CartItem userId={userId}/>

        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleShipInfo}>
          <Text style={styles.buttonText}>Thanh toán nào !</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteCart}>
          <Text style={styles.buttonText}>Xóa giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 12,
    backgroundColor: '#f8f8f8',
  },
  textHeader: {
    fontFamily: 'outfit-bold',
    fontSize: 30
  },
  updateButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'outfit-medium'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: Colors.RED,
    padding: 10,
    borderRadius: 8,
  },
});
