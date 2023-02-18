import React, { useState, useEffect, SetStateAction } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import { Base64 } from '../lib/base64';
import CheckBox from '@react-native-community/checkbox';
import { writeFile } from 'react-native-fs';

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use
const CHARACTERISTIC_UUID_RX = "746d8ce0-87a5-4810-9d67-c47fd233304e"; //read

const DeviceData = () => {

    const [Data, setData] = useState({});
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
                        setData(base64.decode(valenc?.value));
                        // Parse the received JSON string into a JavaScript object
                        //const jsonData = JSON.stringify(base64.decode(valenc?.value));
                        //setData(jsonData);
                    });
                ////////Monitor///////
                device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            /*    setData(base64.decode(characteristic?.value));
                                console.log('Update Received: ', base64.decode(characteristic?.value),);*/
                            const valueString = characteristic?.value.toString();
                            setData(JSON.parse(base64.decode(valueString)));
                            /*console.log('Update Received:', base64.decode(valueString));
                            console.log('ADC11:', setData.ADC11);
                            console.log('ADC12:', setData.ADC12);
                            console.log('ADC13:', setData.ADC13);
                            console.log('ADC14:', setData.ADC14);
                            console.log('ADC21:', setData.ADC21);
                            console.log('ADC22:', setData.ADC22);
                            console.log('ADC23:', setData.ADC23);
                            console.log('ADC24:', setData.ADC24);
                            console.log('ADC31:', setData.ADC31);
                            console.log('ADC32:', setData.ADC32);
                            console.log('ADC33:', setData.ADC33);
                            console.log('ADC34:', setData.ADC34);*/
                        }
                        //setData(JSON.stringify(characteristic?.value));
                        //const service = device.services.find(service => service.uuid === SERVICE_UUID);
                        //const characteristic = service.characteristics.find(characteristic => characteristic.uuid === CHARACTERISTIC_BLE);
                        //return characteristic.writeWithResponse(base64);
                    },
                    'messagetransaction',
                );

                //console.log('Connection established');
            });
        /*.then(() => {
            const service = device.services.find(service => service.uuid === SERVICE_UUID);
            const characteristic = service.characteristics.find(characteristic => characteristic.uuid === CHARACTERISTIC_BLE);
            return characteristic.writeWithResponse(base64);
        })
        .then(() => console.log('Value written to characteristic'))
        */
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
                <TouchableOpacity style={{ width: 130 }}>
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
                <Text>ADC11: {Data.ADC11}</Text>
                <Text>ADC12: {Data.ADC12}</Text>
                <Text>ADC13: {Data.ADC13}</Text>
                <Text>ADC14: {Data.ADC14}</Text>
                <Text>ADC21: {Data.ADC21}</Text>
                <Text>ADC22: {Data.ADC22}</Text>
                <Text>ADC23: {Data.ADC23}</Text>
                <Text>ADC24: {Data.ADC24}</Text>
                <Text>ADC31: {Data.ADC31}</Text>
                <Text>ADC32: {Data.ADC32}</Text>
                <Text>ADC33: {Data.ADC33}</Text>
                <Text>ADC34: {Data.ADC34}</Text>
            </View>
        </View>
    )
}
export default DeviceData;
