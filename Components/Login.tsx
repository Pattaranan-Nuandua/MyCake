import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View, Text, Image, Alert, TouchableOpacity, StatusBar, Keyboard, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@react-native-material/core';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import logofoot from '../Image/logo.png';
import HomeScreen from './Home';
import Register from './Register';
import Resetpassword from './Resetpassword';
import { Navigation } from 'react-native-navigation';
import { useIsFocused, useNavigation } from '@react-navigation/native';

const logo = Image.resolveAssetSource(logofoot).uri;
export default class Login extends Component {

    handleRegister = () => {
        const { navigation } = this.props;
        navigation.navigate('Register');
    };
    handleForgetPassword = () => {
        const { navigation } = this.props;
        navigation.navigate('forgetpassword');
    };

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    login = () => {
        const { username, password } = this.state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username == '') {
            //alert("Please enter Email address");
            this.setState({ username: 'Please enter username' });
        } else if (reg.test(username) === false) {
            //alert("Email is Not Correct");
            this.setState({ username: 'username is Not Correct' });
            return false;
        } else if (password == '') {
            this.setState({ username: 'Please enter password' });
        } else {
            fetch('http://10.0.2.2:3000/api/login.php', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    // we will pass our input data to server
                    username: username,
                    password: password,
                }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson == 'ok') {
                        // redirect to profile page
                        Alert.alert('Successfully Login');
                        this.props.navigation.navigate('Home');
                    } else {
                        Alert.alert('Wrong Login Details');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        Keyboard.dismiss();
    };
    render() {
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
                        //value={Username}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="Username"
                    />
                    <Text style={styles.textpass}>Password</Text>
                    <TextInput
                        style={styles.input}
                        //onChangeText={(e) => setPassword(e)}
                        //value={Password}
                        onChangeText={(Password) => this.setState({ Password })}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity  onPress={this.handleRegister} >
                    <Text style={styles.textregistor}>ลงทะเบียน</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.handleForgetPassword}>
                    <Text style={styles.textforget}>ลืมรหัสผ่าน ?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.login}
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        // width: "100%",
        //height: "100%",
        // alignItems: 'center',
        //justifyContent: 'center',
    },
    image: {
        marginTop: 120,
        marginBottom: 90,
        marginLeft: 160,
        width: 100,
        height: 120,
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
        marginLeft: 50,
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

        //marginTop:510,
        //widht: 'auto'
    }
})