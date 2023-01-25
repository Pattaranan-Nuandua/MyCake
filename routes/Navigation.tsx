import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

import SplashScreen from '../Components/SplashScreen';
import HomeScreen from '../Components/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Resetpassword from '../Components/Resetpassword';
import Active from '../Components/Active';
import Insole from '../Components/Insole';
import Settings from '../Components/Settings';
import Privacy from '../Components/Privacy';
import EditProfile from '../Components/EditProfile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


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
                            iconName = 'analytics';
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
                component={HomeScreen}
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
                component={EditProfile}
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