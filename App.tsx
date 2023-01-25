import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, TextInput ,View,Text} from "react-native";
import SplashScreen from './Components/SplashScreen';
import Login from './Components/Login';
import Resetpassword from './Components/Resetpassword';
import Home from './Components/Home';
import Register from './Components/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './routes/Navigation';

const Stack = createStackNavigator();

const App = () => {
  /*return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
          <FindB/>
      </SafeAreaView>
    </GestureHandlerRootView>
  )};*/

  return(
    <Navigation/>
  )
  };
export default App;