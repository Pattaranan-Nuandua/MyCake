import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import { DEFAULT_SERVICES, device, restoreServices } from 'react-native-bluetooth-serial-next';
import { Device } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-community/async-storage';
import { MyContext } from './TestPronider';

const Home = ({ navigation }) => {
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const [user, setUser] = useState({
        username: '',
        email: '',
        id: null,
        name: '',
        surname: '',
        age: null,
        gender: '',
        weight: null,
        high: null,
        step: null,
        device: '',
        status: ''
    });
    const [isLoading, setLoading] = useState(true);
    interface User {
        id: number;
        name: string;
        email: string;
        surname: string;
        age: number;
        gender: string;
        weight: number;
        height: number;
        step: number;
        device: string;
        status: string;
    }

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('accessToken');
            setAccessToken(token);
            const response = await fetch('http://10.64.58.94:3001/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUser();
    }, []);
    if (!user) {
        return <ActivityIndicator />
    }

    const { data } = useContext(MyContext);
    const checkFoot = () => {
        if (
            parseInt(data.ADC11) >= 12000 &&
            parseInt(data.ADC12) >= 12000 &&
            parseInt(data.ADC13) >= 12000 &&
            parseInt(data.ADC14) >= 12000 &&
            parseInt(data.ADC21) >= 12000 &&
            parseInt(data.ADC22) >= 12000 &&
            parseInt(data.ADC23) >= 12000 &&
            parseInt(data.ADC24) >= 12000 &&
            parseInt(data.ADC31) >= 12000 &&
            parseInt(data.ADC32) >= 12000 &&
            parseInt(data.ADC33) >= 12000 &&
            parseInt(data.ADC34) >= 12000
        ) {
            return 'Normal foot';
        } else if (
            parseInt(data.ADC11) < 12000 ||
            parseInt(data.ADC12) < 12000 ||
            parseInt(data.ADC13) < 12000 ||
            parseInt(data.ADC14) < 12000 ||
            parseInt(data.ADC22) < 12000 ||
            parseInt(data.ADC23) < 12000 ||
            parseInt(data.ADC24) < 12000 ||
            parseInt(data.ADC31) < 12000 ||
            parseInt(data.ADC33) < 12000 ||
            parseInt(data.ADC34) < 12000
        ) {
            return 'FlatFoot';
        } else if (
            parseInt(data.ADC11) >= 12000 &&
            parseInt(data.ADC12) >= 12000 &&
            parseInt(data.ADC13) >= 12000 &&
            parseInt(data.ADC14) >= 12000 &&
            parseInt(data.ADC22) >= 12000 &&
            parseInt(data.ADC31) >= 12000 &&
            parseInt(data.ADC32) >= 12000 &&
            parseInt(data.ADC33) >= 12000 &&
            parseInt(data.ADC34) >= 12000
        ) {
            return 'High arch';
        } else {
            return 'Sleep';
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} >{"ยินดีต้อนรับ"}</Text>
            <View>
                <Icon
                    name="add"
                    size={25} color="#00979C"
                    style={styles.icon} />
                <Text style={styles.textaddDevice} onPress={() => navigation.navigate('devicedata')}>
                    เพิ่มอุปกรณ์
                </Text>
            </View>
            <View style={styles.box}>
                <View style={styles.box}>
                    <View>
                        <Text>{"คุณ"} {user.username} {user.surname}</Text>
                        <Text>{'อายุ'} {user.age} {'ปี'}</Text>
                        <Text>{'น้ำหนัก '}{user.age} {'กิโลกรัม'}</Text>
                        <Text>{'ส่วนสูง'} {user.age} {'เซนติเมตร'}</Text>
                        <Text>{'อุปกรณ์:'} </Text>
                        <Text>{'สถานะอุปกรณ์:'} </Text>
                        <Text>{'Foot Type:'} {checkFoot()}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        flex: 1,
        backgroundColor: "#ffff",
        //width: "100%",
        //height: "100%",
        alignItems: 'center',
        //marginTop:100,
    },
    text: {
        fontSize: 20,
        color: '#00979C',
        fontWeight: 'bold',
        marginRight: 100,
        marginLeft: -100,
        marginTop: 40,
    },
    box: {
        backgroundColor: '#f0f0f0',
        width: 320,
        height: 200,
        borderRadius: 18,
        //marginLeft:45,
        marginTop: 30,
    },
    icon: {
        //marginBottom: 20,
        marginTop: -25,
        marginLeft: 220
    },
    textaddDevice: {
        fontSize: 15,
        marginTop: -22,
        marginLeft: 245,
        color: '#00979C',
        //fontWeight: 'bold',
    },
    name: {
        fontSize: 18,
        marginTop: 30,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    age: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    gender: {
        fontSize: 17,
        marginTop: -23,
        marginLeft: 150,
        //fontWeight: 'bold',
    },
    weight: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    high: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //fontWeight: 'bold',
    },
    box3: {
        backgroundColor: '#f0f0f0',
        width: 320,
        height: 130,
        borderRadius: 18,
        //marginLeft:45,
        marginTop: 30,
    },
    step: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
    device: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
    status: {
        fontSize: 17,
        marginTop: 15,
        marginLeft: 40,
        //textAlign:'center',
        //fontWeight: 'bold',
    },
});
export default Home;