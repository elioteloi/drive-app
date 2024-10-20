import React, { useState, useContext, useEffect } from "react";
import Config from "react-native-config";

import userApi from "../api/userApi";

import { Image, Text, View, FlatList } from "react-native";
import AuthContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button";

const HomeScreen = () => {
  
  const [data, setData] = useState([])
  const [errorBackend, setErrorBackend] = useState('')
  const {isLoggedIn, logout} = useContext(AuthContext)
  const [idValue, setIdValue] = useState(null);

  const {fetchPicture} = userApi()
  
useEffect(() => {
  const fetchID = async () => {
    try {

      const values = await AsyncStorage.getItem('storage')
      if (values !== null) {
        let users = JSON.parse(values);
        setIdValue(users.id)
        console.log("values home", users.id);

        const json = await fetchPicture(users.id)
        setData(json.result)      

      } else {
        console.log("no id in home screen");
        
      }

    } catch (err) {
      console.log("error fetch id:", err);
      
    }
  }
  fetchID()
}, [])

  const renderItem = ({item}) => (
    <View key={item.originalname} style={{ padding: 5 }}>
      <Image 
        source={{ uri: `http://${Config.API_IP_ADDRESS}:3000/drivePath/${item.user}/uploads/${item.originalname}` }} 
        style={{ width: 120, height: 120 }}
      />
      <Button title="delete pic"/>
       
      </View>
      
  )

  return (
    <View>
      
        <View>
          {errorBackend ? <TextError>{errorBackend}</TextError> : null}

        <FlatList
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.originalname}
        />
    
          <Text>{isLoggedIn ? 'Logged In' : 'Not Logged In'}</Text>

          <Button title="logged out" onPress={logout}/>

          <Text>{idValue}</Text>
        </View>
    </View>
  )
}

export default HomeScreen;