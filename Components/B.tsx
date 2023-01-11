import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    } from 'react-native';
import { PERMISSIONS, RESULTS,request,check} from 'react-native-permissions';
import { BleManager } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
//import BLEPeripheral from 'react-native-ble-peripheral'
//import ConnectivityManager from 'react-native-connectivity-status';

interface BluetoothLowEnergyApi {
    scanForDevices() : void;
    //requestPermissions(): Promise<boolean>;
    };

const blemaneger = new BleManager();

const FindB =()=>{
    const [allDevices,setallDevices] = useState<Device[]>([]);
    const onPress = async ()=> {
        if(Platform.OS === 'ios' ){
            await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) =>{
                switch(result){
                  //title: 'Example App Camera Permission',
                  //message: 'Example App needs access to your camera',
                    case RESULTS.GRANTED:
                        console.log('The permission is granted');
                        break;
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is not available (on this device / in this context)');
                        break;
                }
            })
            check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) .then(result => 
                { switch (result) { 
                    case RESULTS.UNAVAILABLE: console.log( 'This feature is not available (on this device / in this context)', ); 
                        break; 
                    case RESULTS.DENIED: console.log( 'The permission has not been requested / is denied but requestable', ); 
                        break; 
                    case RESULTS.GRANTED: console.log('The permission is granted'); break; 
                    case RESULTS.BLOCKED: console.log('The permission is denied and not requestable anymore'); 
                    break; }
                }) 
                await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL).then((result) =>{
                    switch(result){
                      //title: 'Example App Camera Permission',
                      //message: 'Example App needs access to your camera',
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                    }
                })
                check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL) .then(result => 
                    { switch (result) { 
                        case RESULTS.UNAVAILABLE: console.log( 'This feature is not available (on this device / in this context)', ); 
                            break; 
                        case RESULTS.DENIED: console.log( 'The permission has not been requested / is denied but requestable', ); 
                            break; 
                        case RESULTS.GRANTED: console.log('The permission is granted'); break; 
                        case RESULTS.BLOCKED: console.log('The permission is denied and not requestable anymore'); 
                        break; }
                    }) 
        
    
                /*await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL).then((result) =>{
                    switch(result){
                      //title: 'Example App Camera Permission',
                      //message: 'Example App needs access to your camera',
                        case RESULTS.GRANTED:
                            console.log('The permission is granted');
                            break;
                        case RESULTS.UNAVAILABLE:
                            console.log('This feature is not available (on this device / in this context)');
                            break;
                    }
                })
                check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL) .then(result => 
                    { switch (result) { 
                        case RESULTS.UNAVAILABLE: console.log( 'This feature is not available (on this device / in this context)', ); 
                            break; 
                        case RESULTS.DENIED: console.log( 'The permission has not been requested / is denied but requestable', ); 
                            break; 
                        case RESULTS.GRANTED: console.log('The permission is granted'); break; 
                        case RESULTS.BLOCKED: console.log('The permission is denied and not requestable anymore'); 
                        break; }
                    }) */
    
    const requestPermissions = async ()=> {
        let permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
                    try {
                        let result = await check(permission)
                        switch (result) {
                            case RESULTS.UNAVAILABLE:
                                console.log('Bluetooth is not available (on this device / in this context 123)')
                                break
                            case RESULTS.DENIED:
                                console.log('The Bluetooth permission has not been requested / is denied but requestable')
                                break
                            case RESULTS.LIMITED:
                                console.log('The Bluetooth permission is limited: some actions are possible')
                                break
                            case RESULTS.GRANTED:
                                console.log('The Bluetooth permission is granted')
                                return true
                            case RESULTS.BLOCKED:
                                console.log('The Bluetooth permission is denied and not requestable anymore')
                                break
                        }
                    } catch (error) {
                        console.log('The Bluetooth permission check failed: ', error)
                    }
                    return false
                }
                            /*
            // Check if Location Services are enabled
            const locationServicesAvailable = await ConnectivityManager.areLocationServicesEnabled()

            // Check Location permission
            const locationPermission = await ConnectivityManager.isLocationPermissionGranted()
            switch(locationPermission) {
                case "Location.Permission.Denied":
                    // ...
                    break;
                case "Location.Permission.Granted.Always":
                    // ...
                    break;
                case "Location.Permission.Granted.WhenInUse":
                // ...
                    break;
                default:
                    // ...
            }

            // Check if Bluetooth is ON
            const bluetoothIsOn = await ConnectivityManager.isBluetoothEnabled()
            */
        }
    }

    const scanForDevices =  () => {
        console.log("Scanning")
        BleManager.connect("0000fd6f-0000-1000-8000-00805f9b34fb").then(() => {
          // Success code
          console.log("Connected");
        })
        .catch((error) => {
          // Failure code
          console.log(error);
        });
    };

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={onPress}>
                            <Text style={styles.textStyle}>
                        Ask Permission for BLE
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={scanForDevices}>
                            <Text style={styles.textStyle}>
                        Ask Permission for BLE
                        </Text>
                    </TouchableOpacity>
                </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        padding: 20,
    },
    textStyle: {
        fontSize: 18,
        color: 'white',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#f4511e',
        padding: 10,
    }
})

export default FindB;