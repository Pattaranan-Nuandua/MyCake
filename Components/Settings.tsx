import { Box } from '@react-native-material/core';
import * as React from 'react';
import { SafeAreaView,Text,StyleSheet,View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EditProfile from './EditProfile';

const Settings =({navigation})=>{
    return(
        <SafeAreaView style={styles.contrainer}>
            <Text style={styles.settingtext}>
                ตั้งค่า
            </Text>
            <View>
                <View 
                    style={styles.box} />
                    <Icon 
                        name="square-edit-outline" 
                        size={30} color="#00979C" 
                        style={styles.icon} />
                    <Text 
                        style={styles.Text}
                        onPress={() => navigation.navigate('editprofile')}>
                        แก้ไขข้อมูล
                    </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contrainer:{
        backgroundColor: "#ffff",
        width: "100%",
        height: "100%",
    },
    settingtext:{
        textAlign:'center',
        fontSize: 20,
    },
    box:{
        backgroundColor: '#f0f0f0', 
        width:300, 
        height:50, 
        borderRadius:10,
        //marginLeft:45,
        marginTop:50,
        alignSelf:'center'
    },
    Text:{
        fontSize: 16,
        marginLeft:110,
        marginTop:-25,
    },
    icon:{
        marginLeft:65,
        marginTop:-40,
    }
})

export default Settings;