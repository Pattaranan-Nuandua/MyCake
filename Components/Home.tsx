import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createServer } from "miragejs"
import { Navigation } from 'react-native-navigation';
import { DEFAULT_SERVICES, device, restoreServices } from 'react-native-bluetooth-serial-next';
import { Device } from 'react-native-ble-plx';

interface Users {
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
};

if (window.server) {
    server.shutdown()
}

window.server = createServer({
    routes() {
        this.get("/api/movies", () => {
        return {
                users: [
                    {
                        id: 1,
                        name: "ฐิตารีย์",
                        surname: "นิโรจน์ศิลปชัย",
                        age: 22,
                        gender: "หญิง",
                        weight: 45,
                        high: 165,
                        step: 542,
                        device: 'M5',
                        status: "Active",
                    }
                ],
            }
        })
    },
})

const Home = ({ navigation }) => {
    const [users, setUsers] = useState([""]);
    React.useEffect(() => {
        fetch("/api/Users")
        .then((res) => res.json())
        .then((json) => setUsers(json.users))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text} >ยินดีต้อนรับ</Text>
            <View>
                <Icon
                    name="add"
                    size={25} color="#00979C"
                    style={styles.icon} />
                <Text style={styles.textaddDevice} onPress={() => navigation.navigate('DeviceData')}>
                    เพิ่มอุปกรณ์
                </Text>
            </View>
            <View style={styles.box}>
                <View style={styles.box}>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.name}>
                                คุณ {user.name} {user.surname}
                            </Text>
                        ))}

                    </View>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.age}>
                                อายุ: {user.age} ปี   เพศ: {user.gender}
                            </Text>
                        ))}
                    </View>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.weight}>
                                น้ำหนัก: {user.weight} กิโลกรัม
                            </Text>
                        ))}
                    </View>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.high}>
                                ส่วนสูง: {user.high} เซนติเมตร
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.box3}>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.device}>
                                อุปกรณ์: {user.device}
                            </Text>
                        ))}
                    </View>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.status}>
                                สถานะ: {user.status}
                            </Text>
                        ))}
                    </View>
                    <View>
                        {users.map((user) => (
                            <Text key={user.id} style={styles.step}>
                                จำนวนก้าวในการเดิน: {user.step} ก้าว
                            </Text>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
        alignItems: 'center',
        //marginTop:100,
    },
    text: {
        fontSize: 20,
        color: '#00979C',
        fontWeight: 'bold',
        marginRight: 100,
        marginLeft: -100,
        marginTop:40,
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