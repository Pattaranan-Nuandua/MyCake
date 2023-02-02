import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as d3 from 'd3-scale';
import mockData from './mockData';

const Heatmap = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API here
    setData(mockData);
  }, []);

  const colorScale = d3.scaleLinear()
    .domain([0, 33, 66, 100])
    .range(['#90EE90', '#FFFF00', '#FFA500', '#FF0000']);

  return (
    <View style={styles.container}>
      {data.map(cellData => (
        <View
          key={`${cellData.x}-${cellData.y}`}
          style={[
            styles.cell,
            {
              backgroundColor: colorScale(cellData.pressure),
            }
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Heatmap;
