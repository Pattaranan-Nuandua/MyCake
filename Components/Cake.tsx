import React, { useState, useEffect, SetStateAction,useContext,createContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BleManager, Characteristic, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import Heatmap from './Heatmap';
import { Navigation } from 'react-native-navigation';
//import MyContext from './MyContext';
import { MyContext } from './TestPronider';

const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use


function DeviceData ({navigation}) {
    const {data,setData} = useContext(MyContext)
    console.log("DeviceData",data);
    
    const handleAddIndex = async () => {
        const response = await fetch('http://10.64.58.94:3001/add/index',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            //({...data})
            body: JSON.stringify({...data}),
        })
        
        //.then ((response) =>  response.json())
        const index = await response.json();
        console.log(index);
        // .then((response) => {
        //     updateData();
        // })
    }
    const AddIndex = setInterval(handleAddIndex,10000);

    const [connectedDevice, setConnectedDevice] = useState<Device>();
    const [isConnected, setIsConnected] = useState(false);
    //เชื่อมบลูทูธแล้วไปหน้าโชว์ข้อมูลที่อ่านได้จากอุปกรณ์ + เก็บลงDB
    async function scanDevices() {
        console.log('scanning');
        bleManager.startDeviceScan([], null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }
            if (scannedDevice && scannedDevice.name === 'M5StickC-Plus') {
                bleManager.stopDeviceScan();
                handleConnect(scannedDevice);
                
                navigation.navigate('Insole');
                // {handleAddIndex}
                setInterval(handleAddIndex, 500);
                //{handleAddIndex};
            }
        });
        setTimeout(() => {
            bleManager.stopDeviceScan();
        }, 5000);
    }
    

    async function handleConnect(device: Device) {
        console.log('connecting to Device:', device.name);
        device.connect().then((device) => {
            setConnectedDevice(device);
            setIsConnected(true);
            return device.discoverAllServicesAndCharacteristics();
            //navigation.navigate('heatmap')
        })
            .then((device) => {
                bleManager.onDeviceDisconnected(device.id, (error, device) => {
                    console.log('Disconnect');
                    setIsConnected(false);
                });
                // READ MESSAGE
                device.readCharacteristicForService(SERVICE_UUID, CHARACTERISTIC_BLE).then((valenc: any) => {
                    //console.log('Received:', base64.decode(valenc?.value));
                    setData(JSON.parse(base64.decode(valenc?.value)));
                });

                ////////Monitor///////
                device.monitorCharacteristicForService(
                    SERVICE_UUID,
                    CHARACTERISTIC_BLE,
                    (error, characteristic: any) => {
                        if (characteristic?.value != null) {
                            setData(base64.decode(characteristic?.value));
                            //console.log(base64.decode(characteristic.value))
                            //console.log(characteristic.value)
                            //console.log('Update Received: ', base64.decode(characteristic?.value));
                            const valueString = characteristic?.value.toString();
                            setData(JSON.parse(base64.decode(valueString)));
                            //setInterval(handleAddIndex, 1000);
                            //setDB({handleAddIndex})
                            //{handleAddIndex()};
                            //navigation.navigate('Heatmap',{route:data})
                        }
                    },
                    'messagetransaction'
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
                bleManager.cancelDeviceConnection(connectedDevice.id).then(() => console.log('DC completed'));
            }
            const connectionStatus = await connectedDevice.isConnected();
            if (!connectionStatus) {
                setIsConnected(false);
            }
        }
    }

    function getColor(value) {
        const intValue = parseInt(value);
        if (intValue < 500) {
            return 'green';
        } else if (intValue >= 500 && intValue < 800) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => scanDevices() }>
                <Text style={styles.text}>Scan Devices</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => disconnectDevice()}>
                <Text style={styles.text}>Disconnect</Text>
            </TouchableOpacity> 
            {/* <MyContext.Provider value={{data}}>
                {props.children} */}
                {/* <Heatmap/> */}
            {/* <View style={styles.dataContainer}>
                <View style={styles.dataGroup}>
                    
                    <Text style={[styles.dataText, { color: getColor(data.ADC11) }]}>ADC11: {data.ADC11}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC12) }]}>ADC12: {data.ADC12}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC13) }]}>ADC13: {data.ADC13}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC14) }]}>ADC14: {data.ADC14}</Text>
                </View>
                <View style={styles.dataGroup}>
                    <Text style={[styles.dataText, { color: getColor(data.ADC21) }]}>ADC21: {data.ADC21}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC22) }]}>ADC22: {data.ADC22}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC23) }]}>ADC23: {data.ADC23}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC24) }]}>ADC24: {data.ADC24}</Text>
                </View>
                <View style={styles.dataGroup}>
                    <Text style={[styles.dataText, { color: getColor(data.ADC31) }]}>ADC31: {data.ADC31}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC32) }]}>ADC32: {data.ADC32}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC33) }]}>ADC33: {data.ADC33}</Text>
                    <Text style={[styles.dataText, { color: getColor(data.ADC34) }]}>ADC34: {data.ADC34}</Text>
                </View>
                
            </View> */}
            {/* </MyContext.Provider> */}
        </View>
    );
}

export default DeviceData;
//export { MyContext,DeviceData };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        marginTop:50,
    },
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 50,
    },
    dataGroup: {
        flex: 1,
        alignItems: 'center',
    },
    dataText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});