import React from 'react';
import {SafeAreaView ,Text,StyleSheet} from 'react-native';
import { Button } from "@react-native-material/core";


const ConnectBLE= () => {
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Connect Bluetooth</Text>
      <Button title="Connect" color="#00979C" tintColor="white" style={styles.Btnconnect} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  text: {
    fontSize:20,
    //fontFamily:'Kanit',
    alignItems: 'center',
    marginTop:100,
    marginLeft:'auto',
    marginRight:'auto',
    padding:20
  },
  Btnconnect: {
    alignItems: 'center',
    marginTop:510,
    widht: 'auto'
  }
})

export default ConnectBLE;