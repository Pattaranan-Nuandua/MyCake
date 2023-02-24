import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Image, Alert, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@react-native-material/core';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import logofoot from '../Image/logo.png';
import HomeScreen from './Home';
import Register from './Register';
import Resetpassword from './Resetpassword';
import { Navigation } from 'react-native-navigation';
import { useIsFocused, useNavigation } from '@react-navigation/native';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = Image.resolveAssetSource(logofoot).uri;
const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        if (
            username.length === 0 ||
            password.length === 0 
        ) {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }else {
            const response = await fetch('http://10.64.67.61:3001/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
            const data = await response.json()
            if (data.status === 'ok') {
                //await AsyncStorage.setItem("@usertoken", JSON.stringify(data));
                
                await AsyncStorage.setItem('@accessToken', data)
                const indextoken = await AsyncStorage.getItem("@accessToken")
                //const indextoken = JSON.parse(indextoken);
                console.log(indextoken)
                Alert.alert('เข้าสู่ระบบสำเร็จ');
                //'Successfully Login'
                navigation.navigate('Home');
            } else {
                Alert.alert(data.status, data.message)
            }
        }
    }

    return (
        <View>
            <LinearGradient
                colors={['#00979C', 'white']}
                style={styles.container}
            >
                <Text style={styles.textwelcome}>ยินดีต้อนรับเข้าสู่ระบบ</Text>
                <Image source={{ uri: logo }}
                    style={styles.image} />
                <Text style={styles.textuse}>Username</Text>
                <TextInput
                    style={styles.input}
                    //onChangeText={(e) => setUsername(e)}
                    value={username}
                    onChangeText={text => setUsername(text)}
                    placeholder="Username"
                />
                <Text style={styles.textpass}>Password</Text>
                <TextInput
                    style={styles.input}
                    //onChangeText={(e) => setPassword(e)}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                    <Text style={styles.textregistor}>ลงทะเบียน</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('forgetpassword')}>
                    <Text style={styles.textforget}>ลืมรหัสผ่าน ?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        width: 150,
                        padding: 10,
                        backgroundColor: '#037A7E',
                        alignSelf: 'center',
                        borderRadius: 10,
                        marginTop: 30,
                    }}>
                    <Text style={{ color: 'white', alignSelf: 'center', }}>Login</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    image: {
        marginTop: 120,
        marginBottom: 90,
        width: 100,
        height: 120,
        alignSelf: 'center'
    },
    textwelcome: {
        marginLeft: 30,
        fontSize: 20,
        marginBottom: 50,
        marginTop: 80,
        color: '#037A7E',
        fontWeight: 'bold',
    },
    textuse: {
        marginLeft: 60,
        color: '#037A7E',
        marginTop: -50,
    },
    textpass: {
        marginLeft: 60,
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
        backgroundColor: '#fff',
        //marginLeft: 50,
        alignSelf: 'center'
    },
    button1: {
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 160,
        width: 105,
    },
    textregistor: {
        marginLeft: 60,
        color: '#037A7E'
    },
    textforget: {
        marginTop: -16,
        marginLeft: 265,
        color: '#037A7E',
    },
    Btnconnect: {
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 140,
        width: 105,

    }
})
export default Login;
