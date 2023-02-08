import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, TextInput ,View,Text} from "react-native";
import SplashScreen from './Components/SplashScreen';
import Login from './Components/Login';
import Resetpassword from './Components/Resetpassword';
import Home from './Components/Home';
//import {Register} from './Components/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './routes/Navigation';
import Register from './Components/Register';
import {HomeScreen} from './M5stickC/HomeSC';
import {DeviceScreen} from './M5stickC/Device';
import { RootNavigator } from './M5stickC/navigation';

const Stack = createStackNavigator();

const App = () => {
  return(
    <Navigation/>
  )
  /*return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen' 
          component={HomeScreen} 
          options={{
          headerShown: false,}}/>
        <Stack.Screen
          name="Device" 
          component={DeviceScreen} 
          options={{
          headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )*/
  }
  /*return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
          <FindB/>
      </SafeAreaView>
    </GestureHandlerRootView>
  )};*/
export default App;