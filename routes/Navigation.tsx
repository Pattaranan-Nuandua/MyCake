import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'

import SplashScreen from '../Components/SplashScreen';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Resetpassword from '../Components/Resetpassword';
import Active from '../Components/Active';
import Insole from '../Components/Insole';
import Settings from '../Components/Settings';
//import { Stack } from '@react-native-material/core';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const BottomTabNavScreenGroup =()=>{
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName = '';
                    switch (route.name){
                        case 'home':
                            iconName = 'home';
                            break;
                        case 'Active':
                            iconName = 'man';
                            break;
                        case 'Insole':
                            iconName = 'analytics';
                            break;
                        case 'settings':
                            iconName = 'settings';
                            break;
                        case 'login':
                            iconName = 'ios-log-out-outline';
                            break;
                    }
                    return <Icon name={iconName} size={size} color={color} />;
                },
        })}>
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="home"
                component={Home}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Active"
                component={Active}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Insole"
                component={Insole}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="settings"
                component={Settings}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="login"
                component={Login}
            />
            </Tab.Navigator>
    );
};

const MainStackScreen =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="SplashScreen"
                component={SplashScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="BottomTabNavScreenGroup"
                component={BottomTabNavScreenGroup}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="forgetpassword"
                component={Resetpassword}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="register"
                component={Register}
            />
        </Stack.Navigator>
    )
}

const Navigation =()=>{
    return (
        <NavigationContainer>
            <MainStackScreen/>
        </NavigationContainer>
    )
};

export default Navigation;