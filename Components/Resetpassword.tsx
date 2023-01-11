import * as React from 'react';
import { View ,Text,StyleSheet,SafeAreaView,TextInput} from 'react-native';
import { Button } from '@react-native-material/core';
import Login from './Login';

const Resetpassword =()=>{

    const [text0, onChangeText0] = React.useState("");
    const [text1, onChangeText1] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [open,onPress] = React.useState();

    return(
        <SafeAreaView style={styles.container}>
            <Button variant="text" title="<เข้าสู่ระบบ" color='black' style={styles.button1}/>
            <Text style={styles.textforgetpassword} >
                ลืมรหัสผ่าน
            </Text>
            
            <Text style={styles.textusername}>Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText0}
                value={text0}
            />
            <Text style={styles.text}>รหัสผ่านใหม่</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText1}
                value={text1}
            />
            <Text style={styles.text}>ยืนยันรหัสผ่านใหม่</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
            />
            <Button title="ยืนยัน" color="#00979C" tintColor="white" style={styles.button2} />
            
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
        marginTop: 80,
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
    button1:{
        marginRight:270,
        color: '#000000'
    },
    button2:{
        alignItems: 'center',
        marginTop:30,
        marginLeft:140,
        width:105,
    }
})
export default Resetpassword;