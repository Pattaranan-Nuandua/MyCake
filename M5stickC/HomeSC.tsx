import React, { useEffect, useReducer, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Button } from '@react-native-material/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { DeviceCard } from './Components/DeviceCard';
import { BleManager, Device } from 'react-native-ble-plx';
import { theme } from './theme';

const manager = new BleManager();

// Reducer to add only the devices which have not been added yet
// When the bleManager search for devices, each time it detect a ble device, it returns the ble device even if this one has already been returned
const reducer = (
    state: Device[],
    action: { type: 'ADD_DEVICE'; payload: Device } | { type: 'CLEAR' },
): Device[] => {
    switch (action.type) {
        case 'ADD_DEVICE':
            const { payload: device } = action;

            // check if the detected device is not already added to the list
            if (device && !state.find((dev) => dev.id === device.id)) {
                return [...state, device];
            }
            return state;
        case 'CLEAR':
            return [];
        default:
            return state;
    }
};

const HomeScreen = () => {
    // reducer to store and display detected ble devices
    const [scannedDevices, dispatch] = useReducer(reducer, []);

    // state to give the user a feedback about the manager scanning devices
    const [isLoading, setIsLoading] = useState(false);

    const scanDevices = () => {
        // display the Activityindicator
        setIsLoading(true);

        // scan devices
        manager.startDeviceScan(null, null, (error, scannedDevice) => {
            if (error) {
                console.warn(error);
            }

            // if a device is detected add the device to the list by dispatching the action into the reducer
            if (scannedDevice) {
                dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
            }
        });

        // stop scanning devices after 5 seconds
        setTimeout(() => {
            manager.stopDeviceScan();
            setIsLoading(false);
        }, 5000);
    };

    const ListHeaderComponent = () => (
        <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Find Devices</Text>
            </View>
            <View style={styles.sectionContainer}>
                <Button
                    style={{
                        width: 130,
                        padding: 5,
                        backgroundColor: '#800000',
                        alignSelf: 'center',
                        borderRadius: 10,
                        marginTop: 5,
                    }}
                    title="ลบอุปกรณ์"
                    onPress={() => dispatch({ type: 'CLEAR' })}
                />
                {isLoading ? (
                    <View style={styles.activityIndicatorContainer}>
                        <ActivityIndicator color={'teal'} size={25} />
                    </View>
                ) : (
                    <Button 
                        title="ค้นหาอุปกรณ์" 
                        style={{
                            width: 130,
                            padding: 5,
                            backgroundColor: '#037A7E',
                            alignSelf: 'center',
                            borderRadius: 10,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                        onPress={scanDevices} />
                )}
            </View>
        </View>
    );

    useEffect(() => {
        return () => {
            manager.destroy();
        };
    }, []);
    return (
        <SafeAreaView style={styles.body}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={scannedDevices}
                renderItem={({ item }) => <DeviceCard device={item} />}
                ListHeaderComponent={ListHeaderComponent}
                contentContainerStyle={styles.content}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    body: {
        //width: Dimensions.get('screen').width,
        //height: Dimensions.get('screen').height,
    },
    sectionContainer: {
        marginTop: 30,
        //paddingHorizontal: 24,
    },
    sectionTitle: {
        //fontWeight: '600',
        fontSize:20,
        textAlign:'center'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    content: {
        backgroundColor: theme.colors.secondary,
        marginBottom:5,
        //paddingHorizontal: theme.spacing * 2,
    },
    activityIndicatorContainer: { marginVertical: 6 },
});

export { HomeScreen };