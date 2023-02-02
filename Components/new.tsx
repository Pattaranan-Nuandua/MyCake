import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Navigation } from 'react-native-navigation';

const M5SITCKCPLUS_UUID = 'fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3';
const M5STICKCPLUS_CHARACTERISTIC = '673edd34-caf8-41f6-8605-715a69b2a943';

const Bluetooth: React.FC = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const manager = new BleManager();

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

  return (
    <View style={{marginTop:200}}>
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

export default Bluetooth;
