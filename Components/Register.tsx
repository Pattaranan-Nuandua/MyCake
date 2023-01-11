import * as React from 'react';
import { View ,Text,StyleSheet,SafeAreaView,TextInput, } from 'react-native';
import { Button } from '@react-native-material/core';
//import Login from './SignUp';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Register=()=>{

    const [text0, onChangeText0] = React.useState("");
    const [text1, onChangeText1] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [text3, onChangeText3] = React.useState("");
    const [text4, onChangeText4] = React.useState("");
    const [text5, onChangeText5] = React.useState("");
    const [text6, onChangeText6] = React.useState("");
    const [text7, onChangeText7] = React.useState("");
    const [open,onPress] = React.useState('');
    return(
        <SafeAreaView style={styles.container}>
            <Button variant="text" title="<เข้าสู่ระบบ" color='black' style={styles.button2}/>
            <Text style={styles.textforgetpassword} >
                ลงทะเบียน
            </Text>
            <Text style={styles.textusername}>Email</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText0}
                value={text0}
            />
            <Text style={styles.text}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText1}
                value={text1}
            />
            <Text style={styles.text}>รหัสผ่าน</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
            />
            <Text style={styles.text}>น้ำหนัก</Text>
            <TextInput
                style={styles.input2}
                onChangeText={onChangeText3}
                value={text3}
            />
            <Text style={styles.text2}>ส่วนสูง</Text>
            <TextInput
                style={styles.input3}
                onChangeText={onChangeText4}
                value={text4}
            />
            <Text style={styles.text}>อายุ</Text>
            <TextInput
                style={styles.input2}
                onChangeText={onChangeText5}
                value={text5}
            />
            <Text style={styles.text2}>เพศ</Text>
            <TextInput
                style={styles.input3}
                onChangeText={onChangeText6}
                value={text6}
            />
            <Text style={styles.text3}>รายละเอียด</Text>
            <TextInput
                style={styles.input4}
                onChangeText={onChangeText7}
                value={text7}
            />
            <Button title="เข้าสู่ระบบ" color="#00979C" tintColor="white" style={styles.button1} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFFF",
        width: "100%",
        height: "100%",
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    textforgetpassword:{
        textAlign:'center',
        fontSize: 16,
        marginTop:-30
    },
    textusername:{
        marginTop: 30,
        marginLeft: 50,
        color:'#999999'
    },
    input: {
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:50,
    },
    text:{
        marginLeft: 50,
        color:'#999999'
    },
    text2:{
        marginLeft:216,
        marginTop:-80,
        color:'#999999'
    },
    text3:{
        marginLeft:50,
        marginTop:0,
        color:'#999999'
    },
    button1:{
        alignItems: 'center',
        marginTop:30,
        marginLeft:140,
        width:105,
    },
    input2:{
        height: 40,
        width: 125,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:50,
    },
    input3:{
        height: 40,
        width: 125,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:216,
        marginTop:10,
    },
    input4:{
        height: 98,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:50,
        marginTop:2,
    },
    button2:{
        marginRight:270,
        color: '#000000'
    },
})
export default Register;