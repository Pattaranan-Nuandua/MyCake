/*import * as React from 'react';
import { SafeAreaView,StyleSheet,Text, View } from 'react-native';

const ListBLE =()=>{
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>
                อุปกรณ์
            </Text>
            <View style={styles.box}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
    },
    text:{
        fontSize:20,
        textAlign:'center'
    },
    box:{
        backgroundColor: '#f0f0f0', 
        width:320, 
        height:200, 
        borderRadius:18,
        //marginLeft:45,
        marginTop:30,
        alignSelf:'center'
    },
})

export default ListBLE;
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView,View,RefreshControl,FlatList,StyleSheet,Text,TouchableOpacity,Platform} from 'react-native';
import {Button}  from '@react-native-material/core';
import { BleManager, Device } from 'react-native-ble-plx';
import { Navigation } from 'react-native-navigation';
import { ListItem } from 'react-native-elements'

const M5SITCKCPLUS_UUID = 'fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3';
const M5STICKCPLUS_CHARACTERISTIC = '673edd34-caf8-41f6-8605-715a69b2a943';


/*const Item = ({title}) => (
    <View style={styles.box}>
    <Text style={styles.title}>{title}</Text>
        <Button 
            title='เชื่อมต่อ'
            color="#00979C"
            tintColor="white" 
            style={styles.btn}
            onPress={connect}/>
    </View>
);*/

const Count =()=>[{
    id:'',
    key:'',
    name:'',
}]

const ListBLE = ({navigation}) => {
    const [scanning, setScanning] = useState<boolean>(false);
    const [isConnected, setIsConnected] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //const [devices, setDevices] = useState([Count]);
    const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
    const manager = new BleManager();
    let device: Device[];
    let [devices, setDevices] = useState<{}[]>([]);

    useEffect(() => {
        if (Platform.OS === 'ios') {
            manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                setErrorMessage(error.message);
            }
            if (device) {
                setDevices([...devices, device]);
                //setDevices([Count,device]);
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
        
        const Item  = () => (
            <View style={styles.box}>
                {devices.length > 0 ? (
                <>
                <Text style={styles.title}>Select a device to connect:</Text>
                {devices.map((device) => (
                <TouchableOpacity
                key={device.id}
                onPress={() => setSelectedDevice(device.id)}
                >
                <Text style={styles.title1}>{device.name}</Text>
            </TouchableOpacity>
                ))}
            </>
            ) : (
                <Text style={styles.title1} >No devices found</Text>
            )}
            {isConnected && <Text >Connected</Text> }
            {isConnected && navigation.navigate('Home')}
            {errorMessage && <Text style={styles.title1}>{errorMessage}</Text>}
            <Button 
            title='เชื่อมต่อ'
            color="#00979C"
            tintColor="white" 
            style={styles.btn}
            onPress={connect}/>
            </View>
        );
        
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
                ค้นหาอุปกรณ์
        </Text>
        <FlatList
        data={devices}
        //renderItem={(device) => <Item />}
        renderItem={({}) =><Item /> }
        //keyExtractor={device => device.id}
        />
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
    },
    text:{
        fontSize:20,
        textAlign:'center'
    },
    box:{
        backgroundColor: '#f0f0f0', 
        width:320, 
        height:250, 
        borderRadius:18,
        marginTop:30,
        alignSelf:'center'
    },
    title:{
        marginLeft:30,
        marginTop:30,
    },
    title1:{
        marginLeft:30,
    },  
    btn:{
        width:100,
        marginTop:10,
        alignSelf:'center',
    },
    button:{
        marginTop:300,
        alignSelf: 'center',
        //marginLeft:90,
        width:205,
        //textAlign:'center'
    },
})

export default ListBLE;