// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View } from 'react-native';

// Create AuthContext
const AuthContext = createContext(); 

// Create AuthProvider as a functional component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [id, setId] = useState()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('storage');
        if (value) {
          
          const data = JSON.parse(value);
          setIsLoggedIn(data.boolean);
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error('Error reading value', e);
        setIsLoggedIn(false);
      }
    };  

    checkLoginStatus();
  }, []);


  if (isLoggedIn === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const login = async (value) => {    

    try {
      console.log("id authContext screen:", id);
      
      const user = {
        boolean: true,
        id: value
      };
  
      // Store the user object in AsyncStorage
     let storage = JSON.stringify(user)
      await AsyncStorage.setItem('storage', storage);
      
      setIsLoggedIn(true);  // Assume setIsLoggedIn is correctly defined elsewhere


    } catch (e) {
      console.log("Failed to store login state", e);
    }
  };

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('storage');
    } catch (e) {
      console.error('Failed to remove item from AsyncStorage:', e);
    }
  };


  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, id, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
