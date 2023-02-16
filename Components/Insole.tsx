import React, { useState } from 'react';
import { Image, View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import footpic from '../Image/footpic.png';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';

const logofoot = Image.resolveAssetSource(footpic).uri;
const bleManager = new BleManager();
const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
const CHARACTERISTIC_ADC11 = "ae41c84a-2fc1-4b66-8531-02e76eb67315"
const CHARACTERISTIC_ADC12 = "33ee86c5-3737-45ae-a457-9010d0781975"
const CHARACTERISTIC_ADC13 = "a118e86a-703e-4f5d-b421-316882db5353"
const CHARACTERISTIC_ADC14 = "b4e01f10-718d-4488-8a49-f12ca6a37028"

const Insole = () => {
    return(
        <SafeAreaView>
            <Image source={{ uri: logofoot }}
                        style={styles.Image} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Image:{
        marginTop: 20,
        width: 190,
        height: 550,
        alignSelf: 'center',
    }
});

export default Insole;
