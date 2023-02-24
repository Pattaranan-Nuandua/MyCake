import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, TouchableOpacity ,Dimensions} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity / 10})`, // divide opacity by 10
    strokeWidth: 2 // optional, default 3
}

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use
const DeviceData = () => {
    const [Data, setData] = useState({
        ADC11: '',
        ADC12: '',
        ADC13: '',
        ADC14: '',
        ADC21: '',
        ADC22: '',
        ADC23: '',
        ADC24: '',
        ADC31: '',
        ADC32: '',
        ADC33: '',
        ADC34: '',
    });
    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [isConnected, setIsConnected] = useState(false);
    const [graphData, setGraphData] = useState({
        labels: ['ADC11', 'ADC12', 'ADC13', 'ADC14', 'ADC21', 'ADC22', 'ADC23', 'ADC24', 'ADC31', 'ADC32', 'ADC33', 'ADC34'],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });

    useEffect(() => {
        scanDevices();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isConnected) {
                connectedDevice?.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE)
                    .then(valenc => {
                        setData(JSON.parse(base64.decode(valenc?.value)));
                        setGraphData({
                            labels: ['ADC11', 'ADC12', 'ADC13', 'ADC14', 'ADC21', 'ADC22', 'ADC23', 'ADC24', 'ADC31', 'ADC32', 'ADC33', 'ADC34'],
                            datasets: [
                                {
                                    data: [Data.ADC11, Data.ADC12, Data.ADC13, Data.ADC14, Data.ADC21, Data.ADC22, Data.ADC23, Data.ADC24, Data.ADC31, Data.ADC32, Data.ADC33, Data.ADC34],
                                },
                            ],
                        });
                    });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [Data, connectedDevice, isConnected]);

    async function scanDevices() {
        console.log('scanning');
        bleManager.startDeviceScan([], null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }
            if (scannedDevice && scannedDevice.name === 'M5StickC-Plus') {
                bleManager.stopDeviceScan();
                handleConnect(scannedDevice);
            }
        });
        setTimeout(() => {
            bleManager.stopDeviceScan();
        }, 5000);
    }

    async function handleConnect(device: Device) {
        console.log('connecting to Device:', device.name);
        device
            .connect()
            .then(device => {
                setConnectedDevice(device);
                setIsConnected(true);
                return device.discoverAllServicesAndCharacteristics();
            })
            .then(device => {
                bleManager.onDeviceDisconnected(device.id, (error, device) => {
                    console.log('Disconnect')
                    setIsConnected(false);
                });
                device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            setData(JSON.parse(base64.decode(characteristic?.value)));
                        }
                    },
                    'messagetransaction',
                );
            });
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <BarChart
                data={graphData}
                width={Dimensions.get('window').width - 50}
                height={300}
                chartConfig={chartConfig} />
            <TouchableOpacity onPress={() => scanDevices()}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }}>Scan Devices</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DeviceData;