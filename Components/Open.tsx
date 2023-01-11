import React from 'react';
import { View, Text, StyleSheet,Image,SafeAreaView } from "react-native";
import logofoot from '../Image/logo.png';

const Open =()=>{
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
export default Open;