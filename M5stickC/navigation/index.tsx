import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import { HomeScreen } from '../Home';
//import { DeviceScreen } from '../Device';
import {HomeScreen} from '../HomeSC';
import {DeviceScreen} from '../Device';

import { Device } from 'react-native-ble-plx';

export type RootStackParamList = {
    HomeSC: undefined;
    Device: { device: Device };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator mode="card">
            <Stack.Screen name="HomeSC" component={HomeScreen} />
            <Stack.Screen name="Device" component={DeviceScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);