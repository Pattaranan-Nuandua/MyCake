import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            fullname: '',
            surname: '',
            weight: '',
            high: '',
            age: '',
            gender: '',
            details: ''
    }

    userRegister = () => {
        const { email } = this.state;
        const { username } = this.state;
        const { password } = this.state;
        const { fullname } = this.state;
        const { surname } = this.state;
        const { weight } = this.state;
        const { high } = this.state;
        const { age } = this.state;
        const { gender } = this.state;
        const { details } = this.state;

        fetch('https://10.0.2.2/server/register.php', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
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
                details: details,
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Enter Name"
                    style={{
                        width: 250,
                        margin: 10,
                        borderColor: '#333',
                        borderWidth: 1,
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={(userName) => this.setState({ userName })}
                />

                <TextInput
                    placeholder="Enter Email"
                    style={{
                        width: 250,
                        margin: 10,
                        borderColor: '#333',
                        borderWidth: 1,
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={(userEmail) => this.setState({ userEmail })}
                />

                <TextInput
                    placeholder="Enter Password"
                    style={{
                        width: 250,
                        margin: 10,
                        borderColor: '#333',
                        borderWidth: 1,
                    }}
                    underlineColorAndroid="transparent"
                    onChangeText={(userPassword) => this.setState({ userPassword })}
                />

                <TouchableOpacity
                    onPress={this.userRegister}
                    style={{
                        width: 250,
                        padding: 10,
                        backgroundColor: 'magenta',
                        alignItems: 'center',
                    }}>
                    <Text style={{ color: '#fff' }}>Signup</Text>
                </TouchableOpacity>
            </View>
        );
    }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});