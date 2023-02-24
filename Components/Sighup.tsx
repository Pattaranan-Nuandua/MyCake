import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckBox from '@react-native-community/checkbox';
import { Button } from '@react-native-material/core';
import { Navigation } from 'react-native-navigation';
import Privacy from './Privacy';

//import { Server } from 'miragejs';


const Register = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [surname, setSurname] = useState('');
    const [weight, setWeight] = useState('');
    const [high, setHigh] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [details, setDetails] = useState('');
    const [ToggleCheckBox, setToggleCheckBox] = useState(false);
    /*const handleToggleChange = (event) => {
        this.setState({ ToggleCheckBox: event.target.checked });
    };*/
    //const handlePress = (navigation) => {
    //return () => navigation.navigate('privacy');
    //onPress={() => navigation.navigate('Home')} 
    //};
    /*new Server({
        routes() {
            this.post('/api/add', (schema, request) => {
                const users = JSON.parse(request.requestBody);
                // do something with the user data, e.g. save to database
                return { message: 'User added successfully' };
            });
        },
    });*/


    const handleToggleChange = () => {
        setToggleCheckBox(!ToggleCheckBox);
    };
    const handleregister = async () => {
        if (
            email.length === 0 ||
            username.length === 0 ||
            password.length === 0 ||
            fullname.length === 0 ||
            surname.length === 0 ||
            weight.length === 0 ||
            high.length === 0 ||
            age.length === 0 ||
            gender.length === 0 ||
            details.length === 0
        ) {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else if (!ToggleCheckBox) {
            Alert.alert('กรุณายอมรับเงื่อนไขและข้อตกลง');
        } else {
            const response = await fetch('http://10.64.67.61:3001/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    fullname: fullname,
                    surname: surname,
                    weight: weight,
                    high: high,
                    age: age,
                    gender: gender,
                    details: details
                })
                //navigation.navigate('Login')
            })
            if (response.ok) {
                Alert.alert('ลงทะเบียนสำเร็จ');
                navigation.navigate('Logout');
            } else {
                Alert.alert('เกิดข้อผิดพลาดในการลงทะเบียน');
            }
        }
    };

    /*return fetch('http://10.64.102.195:3001/api/add')
        .then(function (response) {
            return response.json();
        })
        .then((response) => {
            Alert.alert(response[0].Message);
        })
        .catch(function (error) {
            console.log(error.message);
        })
    
    /*fetch(URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(Data),
    })
        .then((response) => response.json())
        .then((response) => {
            Alert.alert(response[0].Message);
        })
        .catch((error) => {
            Alert.alert('Error' + error);
        });
        */
    //}

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.textforgetpassword} >
                ลงทะเบียน
            </Text>
            <Text style={styles.textusername}>Email</Text>
            <TextInput
                style={styles.Text}
                value={email}
                //onChangeText={Email=>this.setState({Email})}
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.text}>Username</Text>
            <TextInput
                style={styles.Text}
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <Text style={styles.text}>รหัสผ่าน</Text>
            <TextInput
                style={styles.Text}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Text style={styles.text}>ชื่อ</Text>
            <TextInput
                style={styles.Text}
                value={fullname}
                onChangeText={text => setFullname(text)}
            />
            <Text style={styles.text}>นามสกุล</Text>
            <TextInput
                style={styles.Text}
                value={surname}
                onChangeText={text => setSurname(text)}
            />
            <Text style={styles.text}>น้ำหนัก</Text>
            <TextInput
                style={styles.Text2}
                value={weight}
                onChangeText={text => setWeight(text)}
            />
            <Text style={styles.text2}>ส่วนสูง</Text>
            <TextInput
                style={styles.Text3}
                value={high}
                onChangeText={text => setHigh(text)}
            />
            <Text style={styles.text}>อายุ</Text>
            <TextInput
                style={styles.Text2}
                value={age}
                onChangeText={text => setAge(text)}
            />
            <Text style={styles.text2}>เพศ</Text>
            <TextInput
                style={styles.Text3}
                value={gender}
                onChangeText={text => setGender(text)}
            />
            <Text style={styles.text3}>รายละเอียด</Text>
            <TextInput
                style={styles.Text4}
                value={details}
                onChangeText={text => setDetails(text)}
            />
            <View>
                <CheckBox
                    value={ToggleCheckBox}
                    //value={this.state.ToggleCheckBox}
                    //onChange={this.handleToggleChange}
                    onChange={handleToggleChange}
                    style={styles.checkboxContainer}
                />

                <Text
                    style={styles.label}
                    //onPress={() => navigation.navigate('privacy')}
                    onPress={() => navigation.navigate('privacy')} >
                    Privacy
                </Text>
            </View>
            <TouchableOpacity
                style={styles.button1}
                onPress={handleregister}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>
                    ยืนยัน
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFF",
        width: "100%",
        height: "100%",
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginLeft: 60,
    },
    label: {
        marginLeft: 100,
        marginTop: -25,
        textDecorationLine: 'underline'
    },
    textforgetpassword: {
        textAlign: 'center',
        fontSize: 20,
        //marginTop:-30
    },
    textusername: {
        marginTop: 20,
        marginLeft: 60,
        color: '#999999'
    },
    Text: {
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#f0f0f0',
        marginLeft: 60,
    },
    text: {
        marginLeft: 60,
        color: '#999999'
    },
    text2: {
        marginLeft: 226,
        marginTop: -80,
        color: '#999999'
    },
    text3: {
        marginLeft: 60,
        marginTop: 0,
        color: '#999999'
    },
    button1: {
        marginTop: 20,
        padding: 10,
        width: 105,
        backgroundColor: '#00979C',
        alignSelf: 'center',
        borderRadius: 5,
    },
    Text2: {
        height: 40,
        width: 125,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#f0f0f0',
        marginLeft: 60,
    },
    Text3: {
        height: 40,
        width: 125,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#f0f0f0',
        marginLeft: 226,
        marginTop: 10,
    },
    Text4: {
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor: '#f0f0f0',
        marginLeft: 60,
        marginTop: 2,
    },
})
export default Register;
