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
import { DeviceCard } from './M5stickC/Components/DeviceCard';
import { RootNavigator } from './M5stickC/navigation';
//import Cake from './M5stickC/Components/Cake';
import testBLE from './M5stickC/Components/testBLE';
import Cakeoo from './M5stickC/Components/Cake';
import ForceSensor from './M5stickC/Components/test';
import BluetoothDataReceiver from './M5stickC/Components/test';
import OO from './M5stickC/Components/oo';
import BluetoothData from './M5stickC/Components/get';
import BleTest from './M5stickC/Components/get';
import DeviceData from './M5stickC/Components/Cake';

const Stack = createStackNavigator();

const App = () => {
  return(
    <Navigation/>
  )}

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
  /*return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
          <FindB/>
      </SafeAreaView>
    </GestureHandlerRootView>


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='testBLE' 
          component={testBLE} 
          options={{
          headerShown: false,}}
        />
      </Stack.Navigator>
    </NavigationContainer>


  )};*/
export default App;