import React, { useState } from 'react';
import { Image, View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import footpic from '../Image/footpic.png';
import { BleManager, Device } from 'react-native-ble-plx';
import { Button } from '@react-native-material/core';
import base64 from 'react-native-base64';

const logofoot = Image.resolveAssetSource(footpic).uri;

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
