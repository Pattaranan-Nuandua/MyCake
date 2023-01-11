import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet, TextInput ,View,Text} from "react-native";
import Login from './Components/Login';
import Resetpassword from './Components/Resetpassword';
import Open from './Components/Open';
import Home from './Components/Home';
import Bscan from './Components/sBLE';
import Register from './Components/Register';
import HeaderSettings from './Components/Header';
import Go from './Components/test';
import Real from './Components/real';
import FindB from './Components/B';
import PushNotificationContainer from './Components/Camera';
import SplashScreen from './Components/Camera';
import SquareLogo from './Components/SquareLogo';

const App = () => {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
          <FindB/>
      </SafeAreaView>
    </GestureHandlerRootView>
  )};
export default App;