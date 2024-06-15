import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import TabNavigator from './TabNavigator';
import Dashboard from '../screens/Dashboard';
import {getToken} from '../utils/storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Task from '../screens/TaskComponent';
import TaskDetails from '../screens/TaskDetails';
import { SplashScreen } from 'expo-router';

export type RootStackParamList = {
  Login: React.FC;
  Signup: React.FC;
  TabNavigator: React.FC;
  dynamicTabNavigator:React.FC;
  dynamicLogin:React.FC;
  TaskComponent:React.FC;
  TaskDetails:React.FC;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Login')

  //const initialRoute = useCallback(async()=>{},[])
  useEffect(() => {
    const checkLoginStatus = async () => {
      try { 
        const token = await getToken();
        if(token){
          setIsLoggedIn(true);
          setInitialRoute('TabNavigator')
        }else{          
          setIsLoggedIn(false)
          setInitialRoute('Login')
        }
        
        //console.log(token);
        
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        SplashScreen.hideAsync()
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  return (
   
      <Stack.Navigator initialRouteName={initialRoute}>
        {/* {isLoggedIn ? (
          <Stack.Screen
            name="dynamicTabNavigator"
            component={TabNavigator}
            options={{headerBackVisible: false, headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="dynamicLogin"
            component={Login}
            options={{headerBackVisible: false, headerShown: false}}
          />
        )} */}
      <Stack.Screen
            name="Login"
            component={Login}
            options={{headerBackVisible: false, headerShown: false}}
          />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerTitle: '', headerTransparent: true}}
        />
         <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerBackVisible: false, headerShown: false}}
          />
          <Stack.Screen
            name="TaskComponent"
            component={Task}
            options={{headerBackVisible: false, headerShown: false}}
          />
          <Stack.Screen
            name="TaskDetails"
            component={TaskDetails}
            options={{headerBackVisible: false, headerShown: false}}
          />
      </Stack.Navigator>
   
  );
};

export default Navigation;

const styles = StyleSheet.create({
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})