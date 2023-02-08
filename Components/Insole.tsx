import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface Mask {
    width: number;
    height: number;
    pixels: number[];
}
const Insole = () => {
    const [sensorCsv, setSensorCsv] = useState([]);
    const sensor_Num = 5; // replace 5 with the actual value you want to use

    // Make sure sensor_csv is defined and has a valid value
    if (!sensorCsv) {
        console.error('sensor_csv is not defined or has an invalid value');
        return null;
    }
    const distances = Array.from({ length: sensor_Num }, () => Array.from({ length: mask.width }, () => Array.from({ length: mask.height }, () => 0)));
    const tempMatrix = Array.from({ length: mask.width }, () => Array.from({ length: mask.height }, () => 0));

    const Insole = (mask: Mask) => {
        const pout = Image.createImage(mask.width, mask.height, HSB);
        let max = -1;
        let min = Math.pow(10, 4);
        const maxForce = 8354;

        for (let i = 0; i < sensorCsv.length; i++) {
            for (let x = 0; x < pout.width; x++) {
                for (let y = 0; y < pout.height; y++) {
                    if (mask.pixels[x + (mask.width * y)] === color(0, 0, 0)) {
                        const pressure = map(Math.pow(distances[i][x][y], 3), 0, Math.pow(maxForce, 3), 0.1, 0) * rawSensor[i];
                        if (pressure > tempMatrix[x][y]) {
                            tempMatrix[x][y] = pressure;
                        }
                        if (pressure > max) max = pressure;
                        if (pressure < min) min = pressure;
                    }
                }
            }
        }

        heatmap.loadPixels();

        for (let i = 0; i < pout.width * pout.height; i++) {
            const x = i % pout.width;
            const y = Math.floor(i / pout.width);
            if (mask.pixels[x + (mask.width * y)] === color(0, 0, 0)) {
                const col = map(tempMatrix[x][y], min, max, 180, 0);
                pout.pixels[i] = color(col, 255, 255);
            }
        }
        pout.updatePixels();

        return (
            <View style={styles.container}>
                <Image source={pout} />
            </View>
        );
    };

    return Insole(mask);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Insole;
