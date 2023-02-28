import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import { Device } from 'react-native-ble-plx';


import SplashScreen from '../Components/SplashScreen';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Resetpassword from '../Components/Resetpassword';
import Active from '../Components/Active';
import Insole from '../Components/Insole';
import Settings from '../Components/Settings';
import Privacy from '../Components/Privacy';
import EditProfile from '../Components/EditProfile';
import Sighup from '../Components/Sighup'
import DeviceData from '../Components/Cake';
import Heatmap from '../Components/Heatmap';
///context
import TestProvider from '../Components/TestPronider';
import H from '../Components/h';

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
    SplashScreen: undefined;
    BottomTabNavScreenGroup: undefined;
    forgetpassword: undefined;
    Register: undefined;
    register: undefined;
    editprofile: undefined;
    privacy: undefined;
    Device: { device: Device };
    mm: undefined;
    Home:undefined;
    HomeScreen:undefined;
    devicedata:undefined;
    heatmap:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const BottomTabNavScreenGroup =()=>{
    return(
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => {
                    let iconName = '';
                    switch (route.name){
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Active':
                            iconName = 'man';
                            break;
                        case 'Insole':
                            iconName = 'analytics-outline';
                            break;
                        case 'Settings':
                            iconName = 'settings';
                            break;
                        case 'Logout':
                            iconName = 'ios-log-out-outline';
                            break;
                    }
                    return <Icon name={iconName} size={size} color='#00979C' />;
                },
        })}>
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Home"
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
                name="Settings"
                component={Settings}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                }}
                name="Logout"
                component={Login}
            />
            </Tab.Navigator>
    );
};

const MainStackScreen =()=>{
    return(
        //mode="card"
        <Stack.Navigator >
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
                name="Register"
                component={Sighup}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="privacy"
                component={Privacy}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
                name="editprofile"
                component={EditProfile}           ///
            />
            <Stack.Screen     
                options={{
                    headerShown: false,
                }}
                name="devicedata"
                component={DeviceData}
            />
            <Stack.Screen     
                options={{
                    headerShown: false,
                }}
                name="heatmap"
                component={Heatmap}
            />
            
        </Stack.Navigator>
    )
}

const Navigation =()=>{
    return (
        <TestProvider>
            <NavigationContainer>
                    <MainStackScreen/>
            </NavigationContainer>
        </TestProvider>
    )
};

export default Navigation;