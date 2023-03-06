import React, {useState} from 'react';
import {DatePickerIOS, View, StyleSheet ,Button} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const History = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View style={styles.container}>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DatePickerIOS date={chosenDate} onDateChange={setChosenDate}
        onConfirm = {handleConfirm}
        onCancel = {hideDatePicker} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default History;
// import React, { useState } from 'react';
// import { SafeAreaView, View, Text, Button } from 'react-native';
// //import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const History = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [datePickerVisible, setDatePickerVisible] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const handleConfirm = (date: any) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <RNDateTimePicker mode="datetime" />
//       <View
//         style={{
//           padding: 20,
//           flex: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
//           {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
//         </Text>
//         <Button title="Select a date" onPress={showDatePicker} />
//         <DateTimePickerModal
//             date={selectedDate}
//             isVisible={datePickerVisible}
//             mode="date"
//             display="inline"
//             onConfirm={handleConfirm}
//             onCancel={hideDatePicker}
//         />

//       </View>
//     </SafeAreaView>
//   );
// };

// export default History;

// import moment from 'moment';
// import React,{useState} from 'react';
// import {View ,StyleSheet,Text,Button,DatePickerIOS,TextInput} from 'react-native';
// import { TimeDatePicker, Modes } from "react-native-time-date-picker";
// import DropDownPicker from 'react-native-dropdown-picker';
// import DatePicker from 'react-native-date-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';


// const History =() =>{

//     //const [date, setDate] = useState(new Date())
//     //const [open, setOpen] = useState(false)
//     const now = moment().valueOf();
//     //const [chosenDate, setChosenDate] = useState(new Date());
    
//     return(
//         <View style={styles.container}>
//             <Text style={styles.texthead}>History</Text>
            
            
//             <TimeDatePicker
//                 selectedDate={now}
//                 mode={Modes.date}
//                 onMonthYearChange={(month: number) => {
//                     console.log("month: ", month); // 1643366100000
//                     console.log("month formatted: ", moment(month).format("MM")); // 04
//                     console.log("month formatted: ", moment(month).format("MMM")); // Apr
//                     console.log("month formatted: ", moment(month).format("MMMM")); // April
//                 }}
//                 onSelectedChange={(selected: number) => {
//                     console.log("selected Date: ", selected); // 1649846100000
//                     console.log(
//                     "selected date formatted: ",
//                     moment(selected).format("YYYY/MM/DD HH:mm"),
//                     ); // 2022/04/13 13:35
//                 }}
//                 onTimeChange={(time: number) => {
//                     console.log("time: ", time); // 1643331840000
//                     console.log("time formatted: ", moment(time).format("HH:mm")); // 04:04
//                 }}
//                 />
//         </View>
//     )
// };
// const styles = StyleSheet.create({
//     container: {
//         //flex:1,
//         justifyContent:'center',
//         alignItems: 'center',
//         //marginTop: 50,
//     },
//     texthead: {
//         fontSize:20,
//         marginTop:50,
//         alignItems:'center',
//     }
// })
// export default History;