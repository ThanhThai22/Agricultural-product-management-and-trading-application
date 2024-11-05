import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import MarkFav from './MarkFav'
// import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProductInfo({pet}) {
  // console.log(pet?.imageUrl);

      // const imageUrl = encodeURIComponent(pet?.imageUrl);

  const [image, setImage] = useState(null);
  useEffect(() => {
    if(pet?.imageUrl){
      setImage(pet.imageUrl);
    }
  }, [image])
  
  return (
    <View>
        {image ? (
          <Image
            source={{ uri:image }}
            style={{ 
                width: '100%',
                height: 500,
                objectFit: 'cover',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15
             }}
        />
        ) : (
          <Text>Loading image...</Text>
        )}
        {/* <Image
            source={{ uri:pet?.imageUrl }}
            style={{ 
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15
             }}
        /> */}

        {/* <Image
          source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/grocery-app-2985f.appspot.com/o/%252FGrocery-app%252F1729271271708.jpg?alt=media&token=1dfb8f6d-8a42-453f-b08f-794e867b74c7'}}
          style={{ width: 100, height: 100 }}
        /> */}

        <View style={{ 
            padding: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
         }}>
            <View>
                <Text style={{ 
                    fontFamily: 'outfit-bold',
                    fontSize: 27
                 }}>{pet?.name}</Text>

                 <Text style={{ 
                    fontFamily: 'outfit',
                    fontSize: 16,
                    color: Colors.GRAY,
                    maxWidth: '90%'
                  }}>{pet?.address}</Text>
            </View>

            {/* <AntDesign name="hearto" size={30} color="black" /> */}
            <MarkFav product = {pet}/>
        </View>
    </View>
  )
}