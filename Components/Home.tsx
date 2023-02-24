import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import { DEFAULT_SERVICES, device, restoreServices } from 'react-native-bluetooth-serial-next';
import { Device } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-community/async-storage';

/*interface Users {
    [key: string]: {
        id: number;
        name: string;
        surname: string;
        age: number;
        gender: string;
        weight: number;
        high: number;
        step: number;
        device: string;
        status: string;
    };
};*/

const Home = ({ navigation }) => {
    //const [user ,setUser] = useState({})
   const [user, setUser] = useState({ username: '', email: '', id: null, name: '', surname: '', age: null, gender: '', weight: null, high: null, step: null, device: '', status: '' });
    const [isloading, setLoading] = useState(true);
    const fetchUser = async () => {
        const indextoken = await AsyncStorage.getItem('@accessToken')
        const response = await fetch('http://10.64.70.214:3001/api/userselect/:id'+ user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + indextoken,
            },
        })
        const data = await response.json();
        console.log(data);
        setUser(data.user);
        setLoading(false);
    }
    useEffect(() => {
        fetchUser()
    }, [isloading])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} >ยินดีต้อนรับ</Text>
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
                    {isloading ?
                        <Text>Loading...</Text>
                        :
                        <View>
                        </View>
                    }
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