import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Platform } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial-next';

const BluetoothComponent = () => {
  const [deviceList, setDeviceList] = useState<any[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const scanDevices = async () => {
    setIsScanning(true);
    setDeviceList([]);
    try {
      const discoveredDevices = await BluetoothSerial.discoverUnpairedDevices();
      setDeviceList(
        discoveredDevices.filter((device) => device.name.includes('ESP32'))
      );
    } catch (e) {
      console.log(e);
    }
    setIsScanning(false);
  };

  const connectDevice = async (device: any) => {
    try {
      await BluetoothSerial.connect(device.id);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Button title="Scan Devices" onPress={scanDevices} />
      {isScanning ? <Text>Scanning...</Text> : null}
      <FlatList
        data={deviceList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Connect" onPress={() => connectDevice(item)} />
          </View>
        )}
      />
    </View>
  );
};

export default BluetoothComponent;
