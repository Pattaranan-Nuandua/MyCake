import * as React from 'react';
import { SafeAreaView, StyleSheet, TextInput ,View,Text,Image,Alert,TouchableOpacity ,StatusBar, Dimensions} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '@react-native-material/core';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import logofoot from '../Image/logo.png';
import HomeScreen from './Home';
import Register from './Register';
import Resetpassword from './Resetpassword';
import { Navigation } from 'react-native-navigation';
import { useIsFocused } from '@react-navigation/native';


const Signin = ({navigation}) =>{

    //const ReusableItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;
    const logo = Image.resolveAssetSource(logofoot).uri;
    const [Username, setUsername] = React.useState('');
    const [Password, setPassword] = React.useState('');
    const [data, setData] = React.useState(null);
    const [open,onPress] = React.useState('');
    //const onPress = this.props.navigation;
    //const {goBack} = this.props.navigation;
    //const { navigate} = this.props.navigation;
    let Authenticate =()=>{
        if(!Username || !Password){
            Alert.alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
        else {
            //let api = "http://192.168.0.119/Mycake/server/Auth/Authenticate.php";
            let api = "http://127.0.0.1:3000/MyCake/server/Auth/Authenticate.php";
            /*React.useEffect(() => {
                fetch('http://10.0.2.2:3000/api/Authenticate.php')
                    .then(response => response.json())
                    .then(json => setData(json))
                    .catch(error => console.error(error));
            }, []);*/
            let header = {
            //'Accept': 'application/json',
            'Content-Type': 'application/json',
            }
        let data = {
            Username: Username,
            Password: Password,
            Type:'Login'
        };
        //fetch(getIp() + '/Encaissement.php');   
        fetch(api,{
            method: 'POST',
            headers: header,
            body: JSON.stringify(data),
            })
            .then((response) => {
                if (response) return response.json();
                else {
                    Alert.alert('Reasponse in empty ja');
                    return{};
                }
            })
            .then((data) => {
                switch(data[0].Message){
                    case 'Authenticated':
                        navigation.navigate('/Home'),{
                            UUID:data[0].UUID,
                            Name:data[0].Name,
                        }
                    break;
                    case'Incorrect Password':
                        Alert.alert('Invalid Password');
                    break;
                    case'Account not found':
                        Alert.alert('Account not found');
                    break;
                }
                console.log(data);
        })
        .catch((err) => {
            Alert.alert(err+'error');
        });
    }
};
    return(
            <View>
                <LinearGradient
                    colors={['#00979C' , 'white' ]}
                    style={styles.container}
                >
                <Text style={styles.textwelcome}>ยินดีต้อนรับเข้าสู่ระบบ</Text>
                <Image source={{uri: logo}}
                    style = {styles.image}/>
                <Text style={styles.textuse}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e)=> setUsername(e)}
                    value={Username}
                    placeholder="Username"
                />
                <Text style={styles.textpass}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setPassword(e)}
                    value={Password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <View>
                    <Text style={styles.textregistor} onPress={() => navigation.navigate('Register')}>
                    ลงทะเบียน
                    </Text>
                </View>
                <View>
                    <Text style={styles.textforget} onPress={() => navigation.navigate('forgetpassword')}>
                    ลืมรหัสผ่าน ?
                    </Text>
                </View>
                    <Button 
                        title="เข้าสู่ระบบ" 
                        color="#00979C" 
                        tintColor="white" 
                        style={styles.button1} 
                        //onPress={() => navigation.navigate('Home')} 
                        onPress={()=>Authenticate()}/>
                </LinearGradient>
        </View>
        )
    }

const styles = StyleSheet.create({
    container:{
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
        marginLeft:160,
        width: 100,
        height: 120,
    },
    textwelcome: {
        marginLeft:30,
        fontSize: 20,
        marginBottom: 50,
        marginTop: 80,
        color: '#037A7E',
        fontWeight: 'bold',
    },
    textuse: {
        marginLeft:60,
        color: '#037A7E',
        marginTop:-50,
    },
    textpass:{
        marginLeft:60,
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
        marginLeft:50,
    },
    button1:{
        alignItems: 'center',
        marginTop:30,
        marginLeft:160,
        width:105,
    },
    textregistor:{
        marginLeft:60,
        color:'#037A7E'
    },
    textforget: {
        marginTop: -16,
        marginLeft:265,
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
export default Signin;