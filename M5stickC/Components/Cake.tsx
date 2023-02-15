import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import { Base64 } from '../lib/base64';
import CheckBox from '@react-native-community/checkbox';

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_UUID = "34e6274d-6f78-45db-8620-27c547d6ac47"; //use
const CHARACTERISTIC_UUID_RX = "746d8ce0-87a5-4810-9d67-c47fd233304e"; //read
const BOX_UUID = "673edd34-caf8-41f6-8605-715a69b2a943"; //nah

const DeviceData = () => {

    const [deviceId, setDeviceId] = useState(null);
    const [scanning, setScanning] = useState(false);
    const [message, setMessage] = useState();
    const [ADS1, setADS1] = useState();
    const [ADS2, setADS2] = useState();
    const [ADS3, setADS3] = useState();
    const [ADS4, setADS4] = useState();
    const [ADS5, setADS5] = useState();
    const [ADS6, setADS6] = useState();
    const [ADS7, setADS7] = useState();
    const [ADS8, setADS8] = useState();
    const [ADS9, setADS9] = useState();
    const [ADS10, setADS10] = useState();
    const [ADS11, setADS11] = useState();
    const [ADS12, setADS12] = useState();
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
                device
                    .readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_UUID)
                    .then(valenc => {
                        console.log('Message received:', base64.decode(valenc?.value));
                       //console.log('Message received:', base64.decode(valenc?.value));
                        //setMessage(base64.decode(characteristic.value));
                        setMessage(base64.decode(valenc?.value));
                        //setADS1(base64.decode(valenc?.value));
                        //setADS2(base64.decode(valenc?.value));
                });
                device.monitorCharacteristicForService(
                    SERVICE_UUID,
                    CHARACTERISTIC_UUID,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            setMessage(base64.decode(characteristic?.value));
                            //setADS1(base64.decode(valenc?.value));
                            //setADS2(base64.decode(valenc?.value));
                            console.log(
                                'Message update received: ',
                                base64.decode(characteristic?.value),
                            );
                        }
                    },
                    'messagetransaction',
                );
                console.log('Connection established');
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
                <Text>Data: {message}</Text>
            </View>
        </View>
    )
}
export default DeviceData;
