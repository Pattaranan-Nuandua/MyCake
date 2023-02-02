import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import BleManager from 'react-native-ble-plx';

const ScanBluetooth = () => {
  const [devices, setDevices] = useState<Array<any>>([]);

  useEffect(() => {
    const manager = new BleManager();

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        return;
      }
      if (!devices.some((d) => d.id === device.id)) {
        setDevices((devices) => [...devices, device]);
      }
    });

    return () => {
      manager.stopDeviceScan();
    };
  }, []);

  return (
    <View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Name: {item.name || 'N/A'}</Text>
            <Text>ID: {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ScanBluetooth;
