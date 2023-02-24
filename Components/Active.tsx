import React, { useState, useEffect } from 'react';
import { View, StyleSheet, } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import * as d3 from 'd3';
import { Canvas, Path, Skia, useComputedValue, useFont, Text } from '@shopify/react-native-skia';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import {SelectList}  from 'react-native-dropdown-select-list';
import axios from 'axios';
import picker from './example.json';
interface DataPoint {
  label: string;
  value: number;
  //picker: Array<{ label: string; value: number }>;
  //onSelect: (item: { label: string; value: string }) => void;
  //posts:any;
}

const data: DataPoint[] = [
  { label: 'monday', value: 1200 ,},
  { label: 'tuesday', value: 250 },
  { label: 'wensday', value: 500 },
  { label: 'thursday', value: 430 },
  { label: 'friday', value: 740 },
  { label: 'saturday', value: 900 },
  { label: 'sunday', value: 300 },
];

const GRAPH_MAGIN = 20;
const GRAPH_BAR_WIDTH = 9;
const CanvasHeight = 350;
const Canvaswidth = 400;
const graphHeight = CanvasHeight - 2 * GRAPH_MAGIN;
const graphWidth = Canvaswidth - 2;

const Active = () => {
  const [category, setCategory] = useState('1');
  const [subcategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = React.useState("");
  const categories = [
    {key:'1',value:'สัปดาห์ที่ 1'},
    {key:'2',value:'สัปดาห์ที่ 2'},
    {key:'3',value:'สัปดาห์ที่ 3'},
    {key:'4',value:'สัปดาห์ที่ 4'},
  ]
  const subcategories = {
    '1':[
      {key:'1',value:'monday',count:945},
      {key:'2',value:'tuesday',count:2445},
      {key:'3',value:'wenesday',count:335},
      {key:'4',value:'thursday',count:435},
      {key:'5',value:'friday',count:1345},
      {key:'6',value:'saturday',count:745},
      {key:'7',value:'sunday',count:645},
    ],
    '2':[
      {key:'8',value:'monday',count:3945},
      {key:'9',value:'tuesday',count:2445},
      {key:'10',value:'wenesday',count:335},
      {key:'11',value:'thursday',count:3435},
      {key:'12',value:'friday',count:1345},
      {key:'13',value:'saturday',count:745},
      {key:'14',value:'sunday',count:645},
    ]
  }

  useEffect(() => {
    setLoading(true);
    axios.get('./example.json')
      .then(response => {
        var count = Object.keys(response.data).length;
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({ value: response.data[i].id, label: response.data[i].name }); // Create your array of data
        }
        setCategory(dropDownData);
      }).catch(error => {
        console.log(error.response);
      }).finally(() => setLoading(false));
  }, []);

  //============
  const font = useFont(require('./Roboto-Bold.ttf'), 10);
  const fontSize = 22;
  const xDomain = data.map((dataPoint: DataPoint) => dataPoint.label);
  const xRange = [0, graphWidth];
  const x = d3.scalePoint().domain(xDomain).range(xRange).padding(1);
  const yDomain = [
    0,
    d3.max(data, (yDataPoint: DataPoint) => yDataPoint.value),
  ];
  const yRange = [0, graphHeight];
  const y = d3.scaleLinear().domain(yDomain).range(yRange);
  const path = useComputedValue(() => {
    const newPath = Skia.Path.Make();
    data.forEach((dataPoint: DataPoint) => {
      const rect = Skia.XYWHRect(
        x(dataPoint.label) - GRAPH_BAR_WIDTH / 2,
        graphHeight,
        GRAPH_BAR_WIDTH,
        y(dataPoint.value) * -1,
      );
      const rrect = Skia.RRectXY(rect, 8, 8);
      newPath.addRRect(rrect);
    });
    return newPath;
  }, [])
  if (!font) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <SelectList
        setSelected={setCategory}
        data={categories}
        placeholder={"สัปดาห์"}
        defaultOption={{key:'1',value:'week1'}}
          />
      <Canvas style={styles.canvas}>
        <Path path={path} color="#00979C" />
        {data.map((dataPoint: DataPoint) => (
          <Text
            key={dataPoint.label}
            font={font}
            x={x(dataPoint.label) - 10}
            y={CanvasHeight - 25}
            text={dataPoint.label}
          />
        ))}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  Text: {
    //fontWeight:"700",
    color: '#000',
    //textAlign:'center',
    //marginTop:200,
    //marginBottom:30,
  },
  canvas: {
    height: CanvasHeight,
    width: Canvaswidth,
  },
});

export default Active;
