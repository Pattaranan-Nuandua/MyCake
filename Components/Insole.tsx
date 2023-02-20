import React, { useState } from 'react';
import { Image, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import footpic from '../Image/footpic.png';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';

const logofoot = Image.resolveAssetSource(footpic).uri;
const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use

const Insole = () => {
    const [Data, setData] = useState({});
    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [isConnected, setIsConnected] = useState(false);

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
                    });
                ////////Monitor///////
                device.monitorCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE,
                    (error, characteristic) => {
                        if (characteristic?.value != null) {
                            /*    setData(base64.decode(characteristic?.value));
                                console.log('Update Received: ', base64.decode(characteristic?.value),);*/
                            const valueString = characteristic?.value.toString();
                            setData(JSON.parse(base64.decode(valueString)));
                        }
                    },
                    'messagetransaction',
                );
                //console.log('Connection established');
            });
    }

    return (
        <ScrollView>
            <Image source={{ uri: logofoot }} style={styles.image} />
            {!isConnected ? (
                <View>
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
            ) : (console.log("error"))}
        </ScrollView>
    )}

const styles = StyleSheet.create({
    image:{
        marginTop:50,
        width:300,
        height:900
        
    }
})

export default Insole;
