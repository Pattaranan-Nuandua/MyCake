import React, { useState } from 'react';
import { Image, View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import footpic from '../Image/footpic.png';


interface Mask {
    width: number;
    height: number;
    pixels: number[];
}

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
