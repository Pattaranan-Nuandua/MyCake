import React, { useState, useContext } from 'react';
import { Image, View, StyleSheet, SafeAreaView, ScrollView, Dimensions, Text, Button } from 'react-native';
//import { Button } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { MyContext } from './TestPronider';
import * as d3 from 'd3-scale';
import { scaleLinear } from 'd3-scale';
import { interpolateRgb } from 'd3-interpolate';
import { Navigation } from 'react-native-navigation';


//const logofoot = Image.resolveAssetSource(footpic).uri;
// const bleManager = new BleManager();
// const SERVICE_UUID = "fe8775b4-243b-4aae-a7b8-c4c3ed0f55e3"; //use
// const CHARACTERISTIC_BLE = "ae41c84a-2fc1-4b66-8531-02e76eb67315"; //use


const Insole = ({navigation}) => {
    const { data, setData } = useContext(MyContext);
    const interpolate = interpolateRgb('#00FF00', '#FF0000');
    //const colorScale = d3.interpolateRgb('#00FF00', '#FF0000')(0.5);
    const getColor = (value) => {
        const mappedValue = (value - 0) / (1023 - 0);
        const backgroundColor = interpolate(mappedValue);
        return backgroundColor;
    }
    /*function getColor(value) {
        const mappedValue = (value - 0) / (1023 - 0);
        const color = colorScale(mappedValue);
        return color;
    }*/
    const handleAddIndex = async () => {
        const response = await fetch('http://10.64.58.94:3001/add/index', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            //({...data})
            body: JSON.stringify({ ...data }),
        })
        const index = await response.json()
        console.log(index);
    }
    const AddIndex = setInterval(handleAddIndex, 1000);
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30 }}>Heatmap</Text>
             <Button  title='History' onPress={() =>
        navigation.navigate('History')}></Button> 
            <ScrollView>
                {/* <MyLineChart /> */}
                {/* <Text>{JSON.stringify(route.params)}</Text> */}
                {/* <Text>Hello Insole</Text> */}
                {/* <Text {CheckFoot(data.ADC11)}>ADC: {data.ADC11} </Text> */}
                {/* <Text>ADC1: {data}</Text> */}
                {/* <View style={styles.boxtest}>
                <Text style={styles.dataText}>Text</Text>
            </View>  */}
                <View style={styles.dataContainer}></View>
                <View style={styles.dataGroup}>
                    <View style={styles.dataGroup}>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC11) }]}>ADC11: {data.ADC11}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC12) }]}>ADC12: {data.ADC12}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC13) }]}>ADC13: {data.ADC13}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC14) }]}>ADC14: {data.ADC14}</Text>
                    </View>
                    <View style={styles.dataGroup1}>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC21) }]}>ADC21: {data.ADC21}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC22) }]}>ADC22: {data.ADC22}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC23) }]}>ADC23: {data.ADC23}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC24) }]}>ADC24: {data.ADC24}</Text>
                    </View>
                    <View style={styles.dataGroup2}>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC31) }]}>ADC31: {data.ADC31}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC32) }]}>ADC32: {data.ADC32}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC33) }]}>ADC33: {data.ADC33}</Text>
                        <Text style={[styles.dataText, { backgroundColor: getColor(data.ADC34) }]}>ADC34: {data.ADC34}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
};
const styles = StyleSheet.create({
    // container: {
    //   flexDirection: 'row',
    //   flexWrap: 'wrap',
    // },
    cell: {
        width: '33.33%',
        height: '33.33%',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#F5FCFF',
        marginTop: 50,

    },
    boxtest: {
        width: 200,
        height: 100,
        borderWidth: 2,
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
        //flexDirection: 'row',
        marginTop: 50,
    },
    dataGroup: {
        //flex: 1,
        alignItems: 'center',
        marginTop: 0,
        borderColor: "#F5FCFF",
    },
    boxdata: {
        height: 30,
        width: 30,
        borderRadius: 20,
        borderColor: 'back',
    },
    dataGroup1: {
        alignItems: 'center',
        marginTop: 50
    },
    dataGroup2: {
        alignItems: 'center',
        marginTop: 50,
    },
    dataText: {
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth: 0.1,
        marginTop: 5,
        padding: 2,
        //backgroundColor:'pink',
        //borderRadius:20

        //height: 50,
        //width: 200,
        // backgroundColor: color,
    },
});


export default Insole;
