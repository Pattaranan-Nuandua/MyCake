import React, { useState,Component} from 'react';
import { View ,Text,StyleSheet,SafeAreaView,TextInput, Alert,TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Button } from '@react-native-material/core';
import { Navigation } from 'react-native-navigation';
import Privacy from './Privacy';

interface Props {
    // props definition
    navigation: any;
}
interface State {
    Email: string,
    Username: string,
    Password: string,
    Name: string,
    Surname: string,
    Weight: string
    High: string,
    Age: string,
    Gender: string,
    Details: string,
    ToggleCheckBox:boolean,
    togglePress:boolean,
}
const Register = (props: Props,navigation) => {
//class Register extends Component<Props, State> {
    /*constructor(props: Props) {
        super(props);
        this.state = {
        Email: '',
        Username: '',
        Password: '',
        Name: '',
        Surname: '',
        Weight: '',
        High: '',
        Age: '',
        Gender: '',
        Details: '',
        ToggleCheckBox: false,
        //navigation:any,
        };
    }*/
    
    const [Email, setEmail] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [Surname, setSurname] = useState('');
    const [Weight, setWeight] = useState('');
    const [High, setHigh] = useState('');
    const [Age, setAge] = useState('');
    const [Gender, setGender] = useState('');
    const [Details, setDetails] = useState('');
    const [ToggleCheckBox, setToggleCheckBox] = useState(false);
    /*const handleToggleChange = (event) => {
        this.setState({ ToggleCheckBox: event.target.checked });
    };*/
    //const handlePress = (navigation) => {
        //return () => navigation.navigate('privacy');
        //onPress={() => navigation.navigate('Home')} 
    //};
    const handleToggleChange = (event) => {
        setToggleCheckBox(event.target.checked);
    };
    const InsertRecord = () => {
        /*var Email = this.state.Email;
        var Username = this.state.Username;
        var Password = this.state.Password;
        var Name = this.state.Name;
        var Surname = this.state.Surname;
        var Weight = this.state.Weight;
        var High = this.state.High;
        var Age = this.state.Age;
        var Gender = this.state.Gender;
        var Details = this.state.Details;*/
        if (
        Email.length === 0 ||
        Username.length === 0 ||
        Password.length === 0 ||
        Name.length === 0 ||
        Surname.length === 0 ||
        Weight.length === 0 ||
        High.length === 0 ||
        Age.length === 0 ||
        Gender.length === 0 ||
        Details.length === 0
    ) {
        Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
        var URL = "http://10.0.2.2:3000/api/sighup.php";
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application.json',
        };
        var Data = {
            /*Email: Email,
            Username: Username,
            Password: Password,
            Name: Name,
            Surname: Surname,
            Weight: Weight,
            High: High,
            Age: Age,
            Gender: Gender,
            Details: Details,*/
            Email,
            Username,
            Password,
            Name,
            Surname,
            Weight,
            High,
            Age,
            Gender,
            Details,
        }
        fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(Data),
        })
            .then((response) => response.json())
            .then((response) => {
            Alert.alert(response[0].Message);
        })
        .catch((error) => {
            Alert.alert('Error'+error);
        });
    }
    };
        return(
                <SafeAreaView style={styles.container}>
                    <Text style={styles.textforgetpassword} >
                        ลงทะเบียน
                    </Text>
                    <Text style={styles.textusername}>Email</Text>
                    <TextInput
                        style={styles.Text}
                        value={Email}
                        //onChangeText={Email=>this.setState({Email})}
                        onChangeText={(Email) => setEmail(Email)}
                    />
                    <Text style={styles.text}>Username</Text>
                    <TextInput
                        style={styles.Text}
                        value={Username}
                        onChangeText={Username=>setUsername(Username)}
                    />
                    <Text style={styles.text}>รหัสผ่าน</Text>
                    <TextInput
                        style={styles.Text}
                        value={Password}
                        onChangeText={Password=>setPassword(Password)}
                    />
                    <Text style={styles.text}>ชื่อ</Text>
                    <TextInput
                        style={styles.Text}
                        value={Name}
                        onChangeText={Name=>setName(Name)}
                    />
                    <Text style={styles.text}>นามสกุล</Text>
                    <TextInput
                        style={styles.Text}
                        value={Surname}
                        onChangeText={Surname=>setSurname(Surname)}
                    />
                    <Text style={styles.text}>น้ำหนัก</Text>
                    <TextInput
                        style={styles.Text2}
                        value={Weight}
                        onChangeText={Weight=>setWeight(Weight)}
                    />
                    <Text style={styles.text2}>ส่วนสูง</Text>
                    <TextInput
                        style={styles.Text3}
                        value={High}
                        onChangeText={High=>setHigh(High)}
                    />
                    <Text style={styles.text}>อายุ</Text>
                    <TextInput
                        style={styles.Text2}
                        value={Age}
                        onChangeText={Age=>setAge(Age)}
                    />
                    <Text style={styles.text2}>เพศ</Text>
                    <TextInput
                        style={styles.Text3}
                        value={Gender}
                        onChangeText={Gender=>setGender(Gender)}
                    />
                    <Text style={styles.text3}>รายละเอียด</Text>
                    <TextInput
                        style={styles.Text4}
                        value={Details}
                        onChangeText={Details=>setDetails(Details)}
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
                    <Button 
                        title="ยืนยัน" 
                        color="#00979C" 
                        tintColor="white" 
                        style={styles.button1}
                        onPress={(InsertRecord)}
                    />
                </SafeAreaView>
            )
        };
const styles = StyleSheet.create({
    container:{
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
        marginTop:-25,
        textDecorationLine: 'underline'
    },
    textforgetpassword:{
        textAlign:'center',
        fontSize: 20,
        //marginTop:-30
    },
    textusername:{
        marginTop: 20,
        marginLeft: 60,
        color:'#999999'
    },
    Text: {
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:60,
    },
    text:{
        marginLeft: 60,
        color:'#999999'
    },
    text2:{
        marginLeft:226,
        marginTop:-80,
        color:'#999999'
    },
    text3:{
        marginLeft:60,
        marginTop:0,
        color:'#999999'
    },
    button1:{
        alignItems: 'center',
        marginTop:5,
        marginLeft:160,
        width:105,
    },
    Text2:{
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
    Text3:{
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
    Text4:{
        height: 40,
        width: 290,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#fff',
        backgroundColor:'#f0f0f0',
        marginLeft:60,
        marginTop:2,
    },
})
export default Register;
