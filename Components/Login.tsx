import * as React from 'react';
import { SafeAreaView, StyleSheet, TextInput ,View,Text,Image,Alert} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@react-native-material/core';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import logofoot from '../Image/logo.png';
import Home from './Home';
import Register from './Register';
import Resetpassword from './Resetpassword';

const Login = ({}) =>{

    const logo = Image.resolveAssetSource(logofoot).uri;
    const [text0, onChangeText0] = React.useState("");
    const [text1, onChangeText1] = React.useState("");
    const [open,onPress] = React.useState('');
    return(
            <View>
                <LinearGradient
                    colors={['#00979C' , 'white' ]}
                    height = '100%'
                    width = '100%'
                >
                <Text style={styles.textwelcome}>ยินดีต้อนรับเข้าสู่ระบบ</Text>
                <Image source={{uri: logo}}
                    style = {styles.image}/>
                <Text style={styles.textuse}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText0}
                    value={text0}
                    placeholder="Username"
                />
                <Text style={styles.textpass}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText1}
                    value={text1}
                    placeholder="Password"
                />
                <View
                    onStartShouldSetResponder={(Home) => this.onPress('ลงทะเบียน')}>
                    <Text style={styles.textregistor} >
                    ลงทะเบียน
                    </Text>
                </View>
                <View
                    onStartShouldSetResponder={(Home) => this.onPress('ลืมรหัสผ่าน')}>
                    <Text style={styles.textforget} >
                    ลืมรหัสผ่าน ?
                    </Text>
                </View>
                    <Button title="เข้าสู่ระบบ" color="#00979C" tintColor="white" style={styles.button1} />
                </LinearGradient>
        </View>
        )
    }

const styles = StyleSheet.create({
    container:{
       // width: "100%",
        //height: "100%",
       // alignItems: 'center',
        //justifyContent: 'center',
    },
    image: {
        marginTop: 120,
        marginBottom: 90,
        marginLeft:140,
        width: 100,
        height: 120,
    },
    textwelcome: {
        marginLeft:30,
        fontSize: 18,
        marginBottom: 50,
        marginTop: 80,
        color: '#037A7E',
        fontWeight: 'bold',
    },
    textuse: {
        marginLeft:40,
        color: '#037A7E',
        marginTop:-50,
    },
    textpass:{
        marginLeft:40,
        color: '#037A7E',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#fff',
        marginLeft:40,
    },
    button1:{
        alignItems: 'center',
        marginTop:30,
        marginLeft:140,
        width:105,
    },
    textregistor:{
        marginLeft:40,
        color:'#037A7E'
    },
    textforget: {
        marginTop: -16,
        marginLeft:260,
        color:'#037A7E',
    },
    Btnconnect: {
        alignItems: 'center',
        marginTop:30,
        marginLeft:140,
        width:105,

        //marginTop:510,
        //widht: 'auto'
    }
})
export default Login;