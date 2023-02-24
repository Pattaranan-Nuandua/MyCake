import React, { useState } from 'react';
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import footpic from '../Image/footpic.png';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';
import { LineChart } from 'react-native-chart-kit';
import { useRoute } from '@react-navigation/native';

const logofoot = Image.resolveAssetSource(footpic).uri;
const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use

const MyLineChart = () => {
    return (
        <>
            <Text style={{}}>Line Chart</Text>
            <LineChart
                data={{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                    datasets: [
                        {
                            data: [20, 45, 28, 80, 99, 43],
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </>
    );
};

const Insole = () => {
    const route = useRoute();
    return (
        <>
            <MyLineChart />
            <Text>{JSON.stringify(route.params)}</Text>
        </>
    )
};
const styles = StyleSheet.create({
    image: {
        marginTop: 50,
        width: 300,
        height: 900
    }
})

export default Insole;
