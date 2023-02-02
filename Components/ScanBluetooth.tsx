import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Platform,TouchableOpacity } from 'react-native';
import { Button } from '@react-native-material/core';
import { BleManager } from 'react-native-ble-plx';
import { Navigation } from 'react-native-navigation';

const M5SITCKCPLUS_UUID = 'fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3';
const M5STICKCPLUS_CHARACTERISTIC = '673edd34-caf8-41f6-8605-715a69b2a943';

const ScanBluetooth = ({navigation}) => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)
  const manager = new BleManager();

  const handleScan = () => {
    if (scanning) {
      manager.stopDeviceScan();
      setScanning(false);
      return;
    }
    setDevices([]);
    setScanning(true);
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!devices.some((d) => d.id === device.id)) {
        setDevices((devices) => [...devices, device]);
      }
    });
  };

  useEffect(() => {
    if (Platform.OS === 'ios') {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          setErrorMessage(error.message);
        }
        if (device) {
          setDevices([...devices, device]);
        }
      });
    }
  }, []);

  const connect = async () => {
    if (!selectedDevice) {
      setErrorMessage('No device selected');
      return;
    }
    try {
      const device = await manager.connectToDevice(selectedDevice);
      const service = await device.discoverAllServicesAndCharacteristics();
      const characteristics = await service.characteristicsForService(
        M5SITCKCPLUS_UUID
      );
      const targetCharacteristic = characteristics.filter(
        (c) => c.uuid === M5STICKCPLUS_CHARACTERISTIC
      )[0];
      await targetCharacteristic.read();
      setIsConnected(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ค้นหาอุปกรณ์
      </Text>
      <Button 
      style={styles.button}
      title={scanning ? 'Stop Scan' : 'Start Scan'} 
      onPress={handleScan}
      color="#00979C"
      tintColor="white"   />
      {devices.length > 0 ? (
        <>
          <Text>Select a device to connect:</Text>
          {devices.map((device) => (
            <TouchableOpacity
              key={device.id}
              onPress={() => setSelectedDevice(device.id)}
            >
              <Text>{device.name}</Text>
            </TouchableOpacity>
          ))}
        </>
      ) : (
        <Text>No devices found</Text>
      )}
      <TouchableOpacity onPress={connect}>
        <Text>Connect</Text>
      </TouchableOpacity >
      
      {isConnected && <Text>Connected</Text>}
      {isConnected && <Text onPress={() => navigation.navigate('Home')}>Click</Text>}
      {errorMessage && <Text>{errorMessage}</Text>}
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
    //alignItems: 'center',
    marginLeft:90,
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
