import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import { Base64 } from '../lib/base64';
import CheckBox from '@react-native-community/checkbox';

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use
//const CHARACTERISTIC_ADC12 = "33ee86c5-3737-45ae-a457-9010d0781975" //use
//const CHARACTERISTIC_ADC13 = "a118e86a-703e-4f5d-b421-316882db5353" //use
//const CHARACTERISTIC_ADC14 = "b4e01f10-718d-4488-8a49-f12ca6a37028" //use
const CHARACTERISTIC_UUID_RX = "746d8ce0-87a5-4810-9d67-c47fd233304e"; //read
const BOX_UUID = "673edd34-caf8-41f6-8605-715a69b2a943"; //nah

const DeviceData = () => {

    const [deviceId, setDeviceId] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [message, setMessage] = useState();
    const [ADC11, setADC11] = useState<object>([]);
    const [ADC12, setADC12] = useState();
    const [ADC13, setADC13] = useState<object>([]);
    const [ADC14, setADC14] = useState();
    const [ADC21, setADC21] = useState();
    const [ADC22, setADC22] = useState();
    const [ADC23, setADC23] = useState();
    const [ADC24, setADC24] = useState();
    const [ADC31, setADC31] = useState();
    const [ADC32, setADC32] = useState();
    const [ADC33, setADC33] = useState();
    const [ADC34, setADC34] = useState();
    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [isConnected, setIsConnected] = useState(false);

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
                // READ MESSAGE
                device.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE)
                    .then(valenc => {
                        console.log('Received:', base64.decode(valenc?.value));
                        setADC11(base64.decode(valenc?.value));
                    });
                ////////Monitor///////
                device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            setADC11(base64.decode(characteristic?.value));
                            console.log(
                                'Update Received: ', base64.decode(characteristic?.value),
                            );
                        }
                    },
                    'messagetransaction',
                );
                //console.log('Connection established');
            });
    }
    async function disconnectDevice() {
        console.log('Disconnecting start');
        if (connectedDevice != null) {
            const isDeviceConnected = await connectedDevice.isConnected();
            if (isDeviceConnected) {
                bleManager.cancelTransaction('messagetransaction');
                bleManager.cancelTransaction('nightmodetransaction');
                bleManager.cancelDeviceConnection(connectedDevice.id).then(() =>
                    console.log('DC completed'),
                );
            }
            const connectionStatus = await connectedDevice.isConnected();
            if (!connectionStatus) {
                setIsConnected(false);
            }
        }
    }

    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <View >
                <TouchableOpacity style={{ width: 120 }}>
                    {!isConnected ? (
                        <Button
                            title="Connect"
                            onPress={() => {
                                scanDevices();
                            }}
                            disabled={false}
                        />
                    ) : (
                        <Button
                            title="Disonnect"
                            onPress={() => {
                                disconnectDevice();
                            }}
                            disabled={false}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{ marginTop: 30 }}>Device:</Text>
                <Text>BLE: {ADC11}</Text>

            </View>
        </View>
    )
}
export default DeviceData;
