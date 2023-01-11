// React Native PermissionsAndroid | Ask Run Time Android Permission
// https://aboutreact.com/react-native-android-permission/

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { PERMISSIONS, RESULTS,request} from 'react-native-permissions';
const FindB =()=>{

}
  const onPress = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'ios') {
      // Calling the permission function
      const granted = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL).then((result) =>{
        switch(result){
          //title: 'Example App Camera Permission',
          //message: 'Example App needs access to your camera',
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
            case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          //console.warn('yes');

        }
        })

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{styles.container}}>
        <View style={{styles.container}}>
          <TouchableOpacity
            style={{styles.buttonStyle}}
            onPress={onPress}>
            <Text style={{styles.textStyle}}>
              Ask Permission for BLE
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Ask Run Time Android Permission
          {'\n'}
          React Navigation
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  )}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
  },
  buttonStyle: {
    //alignItems: 'center',
    backgroundColor: '#f4511e',
    padding: 10,
  }
})
export default onPress;