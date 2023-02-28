import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as d3 from 'd3-scale';
//import mockData from './mockData';
//import { MyContext } from "./Cake";
import { MyContext } from './TestPronider';
import PercentageBar from './PercentageBar';


const Heatmap = () => {
  //const [data, setData] = useState([]);

  //useEffect(() => {
  // Fetch data from API here
  //setData(mockData);
  //}, []);

  const { data, setData } = useContext(MyContext);
  console.log("Heatmap", data);

  // Define the color scale using d3's interpolate function
  const colorScale = d3.interpolateRgb('#00FF00', '#FF0000');

  function getColor(value) {
    // Map the value to a range between 0 and 1
    const mappedValue = (value - 0) / (1023 - 0);
    // Use the color scale to get the color for the value
    const color = colorScale(mappedValue);
    return color;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '700', fontSize: 22, marginTop: 30 }}>Heatmap</Text>
      <View style={styles.dataContainer}>
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
        <View style={styles.dataGroup2}>
          <Text style={[styles.dataText, { color: getColor(data.ADC31) }]}>ADC31: {data.ADC31}</Text>
          <Text style={[styles.dataText, { color: getColor(data.ADC32) }]}>ADC32: {data.ADC32}</Text>
          <Text style={[styles.dataText, { color: getColor(data.ADC33) }]}>ADC33: {data.ADC33}</Text>
          <Text style={[styles.dataText, { color: getColor(data.ADC34) }]}>ADC34: {data.ADC34}</Text>
        </View>

      </View>
    </View>

  );
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
    backgroundColor: '#F5FCFF',
    marginTop: 50,
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
  boxdata: {
    height: 30,
    width: 30,
    borderRadius: 50,

  },
  dataGroup1: {
    alignItems: 'center',
  },
  dataGroup2: {
    alignItems: 'center',
  },
  dataText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Heatmap;
