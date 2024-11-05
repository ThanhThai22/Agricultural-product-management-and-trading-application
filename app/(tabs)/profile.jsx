import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import Colors from "./../../constants/Colors";
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


export default function Profile() {

  const {user}=useUser();
  const router = useRouter();
  const {signOut} = useAuth();

  const Menu = [
    {
      id: 1,
      name: 'Add new product',
      icon: 'add-circle',
      path: '/add-new-product'
    },
    {
      id: 5,
      name: 'My Post',
      icon: 'bookmark',
      path: '/user-post'
    },
    {
      id: 2,
      name: 'Favorites',
      icon: 'heart',
      path: '/(tabs)/favorite'
    },
    {
      id: 3,
      name: 'Inbox',
      icon: 'chatbubble',
      path: '/(tabs)/inbox'
    },
    {
      id: 4,
      name: 'Logout',
      icon: 'exit',
      path: 'logout'
    }
  ];

  const onPressMenu=(menu)=>{
    if(menu.path=='logout')
    {
      signOut();
      router.push('/login')
      return ;
    }

    router.push(menu.path)
  }

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>My Profile</Text>

      <View style={{ 
        display: 'flex',
        alignItems: 'center',
        marginVertical: 25
       }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ 
            width: 60,
            height: 60,
            borderWidth: 1,
            borderRadius: 99,
            borderColor: Colors.PRIMARY,
           }}
        />
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginTop: 8 }}>{user?.fullName}</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 18, color: Colors.GRAY }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>


      <FlatList
        data={Menu}
        renderItem={({item, index})=>(
          <TouchableOpacity
          onPress={()=>onPressMenu(item)}
          key={index}  
          style={{ 
            marginVertical: 10,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: Colors.WHITE,
            padding: 10,
            borderRadius: 10
           }}>
            <Ionicons name={item?.icon} size={30} color={Colors.PRIMARY}
            style={{ padding: 10, backgroundColor: Colors.LIGHT_PRIMARY, borderRadius: 12 }}/>

            <Text style={{ fontFamily: 'outfit', fontSize: 22 }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}