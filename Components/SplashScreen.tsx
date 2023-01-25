import * as React from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from "react-native";
import {NavigationHelpers, StackActions} from '@react-navigation/native';
import logofoot from '../Image/logo.png';

interface Props {
  navigation: NavigationHelpers<any, any>;
}

const SplashScreen = ({navigation}: Props) => {
  setTimeout(() => {
    navigation.dispatch(StackActions.replace('BottomTabNavScreenGroup'));
  }, 4000);
    const logo = Image.resolveAssetSource(logofoot).uri;
    return(
    <SafeAreaView style = {styles.container}>
        <Image source={{uri: logo}}
                style = {styles.image}/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: "#00979C",
      width: "100%",
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
        alignItems: 'center',
        width: 100,
        height: 120,
    }
  })
export default SplashScreen;