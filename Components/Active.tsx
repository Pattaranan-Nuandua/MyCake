import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropdownPicker from 'react-native-dropdown-picker';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';

const walkCount = [
  {
    "Week 1": {
      Mon: 329,
      Tue: 870,
      Wed: 400,
      Thu: 530,
      Fri: 983,
      Sat: 324,
      Sun: 532,
    },
  },
  {
    "Week 2": {
      Mon: 329,
      Tue: 820,
      Wed: 400,
      Thu: 550,
      Fri: 433,
      Sat: 724,
      Sun: 532,
    },
  },
];

const Active = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [weekData, setWeekData] = useState(walkCount[0]["Week 1"]);

  const updateWeek = (index: number) => {
    setSelectedWeek(index);
    setWeekData(walkCount[index][Object.keys(walkCount[index])[0]]);
  };

  const days = Object.keys(weekData);
  const values = Object.values(weekData);

  return (
    <View style={styles.container}>
      <DropdownPicker
        items={walkCount.map((week, index) => ({ label: Object.keys(week)[0], value: index }))}
        defaultValue={selectedWeek}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => updateWeek(item.value)}
      />
      <View style={styles.chartContainer}>
        <YAxis
          data={values}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'grey' }}
        />
        <BarChart
          style={{ height: 200, flex: 1 }}
          data={values}
          svg={{ fill: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </BarChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          data={values}
          formatLabel={(value, index) => days[index]}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'grey' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    padding: 20,
  },
});

export default Active;
