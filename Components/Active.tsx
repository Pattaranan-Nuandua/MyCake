import React, { useState } from 'react';
import { View, StyleSheet,} from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import * as d3 from 'd3';
import {Canvas,Path,Skia,useComputedValue,useFont,Text,Fill} from '@shopify/react-native-skia';

interface DataPoint {
  label: string;
  value: number;
}

const data: DataPoint[]=[
    {label: 'monday',value:1200},
    {label: 'tuesday',value:250},
    {label: 'wensday',value:500},
    {label: 'thursday',value:430},
    {label: 'friday',value:740},
    {label: 'saturday',value:900},
    {label: 'sunday',value:300},
];

const GRAPH_MAGIN = 20;
const GRAPH_BAR_WIDTH = 9;
const CanvasHeight= 350;
const Canvaswidth= 400;
const graphHeight = CanvasHeight - 2 * GRAPH_MAGIN;
const graphWidth = Canvaswidth - 2 ;

const Active = () => {
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
  },[])
  if (!font) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <Path path={path} color="#00979C"/>
        {data.map((dataPoint: DataPoint)=>(
          <Text
          key={dataPoint.label}
          font={font}
          x={x(dataPoint.label)-10}
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
    justifyContent:'center',
    alignSelf:'center',
  },
  Text: {
    //fontWeight:"700",
    color:'#000',
    //textAlign:'center',
    //marginTop:200,
    //marginBottom:30,
  },
  canvas:{
    height:CanvasHeight,
    width:Canvaswidth,
  }
});

export default Active;
