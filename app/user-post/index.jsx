import { View, Text, FlatList, Pressable, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import VeListItem from './../../components/Home/VeListItem'
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function UserPost() {

    const navigation = useNavigation();
    const {user} = useUser();
    const [loader, setLoader] = useState(false);

    const [userPostList, setUserPostList] = useState([])
    useEffect(() => {
      navigation.setOptions({
        headerTitle: 'My post'
      })
      setLoader(true);
      user&&getUserPost();
      setLoader(false);

    }, [user]);

    // use to get user post 
    const getUserPost=async()=>{
      setLoader(true);
      setUserPostList([]);
      const q=query(collection(db, 'Products'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
      const querySnapShot = await getDocs(q);

      querySnapShot.forEach((doc)=>{
        // console.log(doc.data());
        setUserPostList(prev=>[...prev, doc.data()]);
      })
      setLoader(false);
    }

    const onDeletePost=(docId)=>{
      Alert.alert('Notification delete post?', 'Do you really want to delete this post', [
        {
          text: 'Cancel',
          onPress: ()=>console.log("Cancel Click"),
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: ()=>deletePost(docId)
        }
      ])
    }

    const deletePost=async(docId)=>{
      await deleteDoc(doc(db, 'Products', docId));
      getUserPost();
    }
    
  return (
    <View style={{ padding: 20 }}>
      {/* <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>UserPost</Text> */}

      <FlatList
      style={{ 
        padding: 5,
        marginVertical: 5
       }}
        data={userPostList}
        refreshing={loader}
        onRefresh={getUserPost}
        renderItem={({item, index})=>(
          <View>
            <VeListItem pet={item} key={index}/>
            <TouchableOpacity 
            onPress={()=>onDeletePost(item?.id)}
            style={styles.deleteBtn}>
              <Text style={{ 
                fontFamily: 'outfit',
                textAlign: 'center',
               }}>delete</Text>
            </TouchableOpacity>

          </View>
          
        )}
      />

      {userPostList?.length==0 && 
        <Text>No post Found</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  deleteBtn:{
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 6,
    borderRadius: 7,
    width: Dimensions.get('screen')
  }
})