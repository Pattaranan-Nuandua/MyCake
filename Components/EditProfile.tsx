import * as React from 'react';
import { SafeAreaView,Text,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import { Button} from '@react-native-material/core';
import Settings from './Settings';

const EditProfile = ({navigation})=>{
    const [text0, onChangeText0] = React.useState("");
    const [text1, onChangeText1] = React.useState("");
    const [text2, onChangeText2] = React.useState("");
    const [text3, onChangeText3] = React.useState("");
    const [text4, onChangeText4] = React.useState("");
    const [text5, onChangeText5] = React.useState("");
    const [text6, onChangeText6] = React.useState("");

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.textforgetpassword} >
                แก้ไขข้อมูล
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
            <TouchableOpacity  
                style={styles.button1} 
                onPress={() => navigation.navigate('Settings')}>
                <Text style={{color:'#fff',alignSelf:'center'}}>
                    ยืนยัน
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
        //alignSelf: 'center',
        //justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginLeft: 50,
    },
    label: {
        marginLeft: 90,
        marginTop:-25,
        textDecorationLine: 'underline'
    },
    textforgetpassword:{
        textAlign:'center',
        fontSize: 20,
        //marginTop:-30
    },
    textusername:{
        marginTop: 50,
        marginLeft: 70,
        color:'#999999',
        
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
        //marginLeft:50,
        alignSelf:'center'
    },
    text:{
        marginLeft: 70,
        color:'#999999'
    },
    text2:{
        marginLeft:236,
        marginTop:-80,
        color:'#999999'
    },
    text3:{
        marginLeft:50,
        marginTop:0,
        color:'#999999'
    },
    button1:{
        marginTop:50,
        padding: 10,
        width:105,
        backgroundColor: '#00979C',
        alignSelf: 'center',
        borderRadius:5,
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
        marginLeft:60,
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
        marginLeft:226,
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
})
export default EditProfile;