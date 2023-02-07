import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet,Platform,TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { BleManager } from 'react-native-ble-plx';
import { Navigation } from 'react-native-navigation';

const M5SITCKCPLUS_UUID = 'fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3';
const M5STICKCPLUS_CHARACTERISTIC = '673edd34-caf8-41f6-8605-715a69b2a943';

const ScanBluetooth = ({navigation}) => {
  const [scanning, setScanning] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ค้นหาอุปกรณ์
      </Text>
      <Button 
      style={styles.button}
      title={scanning ? 'Stop Scan' : 'Start Scan'} 
      color="#00979C"
      tintColor="white" 
      onPress={() => navigation.navigate('listble')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    width: "100%",
    height: "100%",
  },
  button:{
    marginTop:300,
    alignSelf: 'center',
    //marginLeft:90,
    width:205,
    //textAlign:'center'
  },
  text:{
    marginTop:50,
    textAlign:'center',
    fontSize: 20,
  }
});

export default ScanBluetooth;
