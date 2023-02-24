import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './routes/Navigation';

const Stack = createStackNavigator();

const App = () => {
  return(
    <Navigation/>
  )}

  /*return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeScreen' 
          component={HomeScreen} 
          options={{
          headerShown: false,}}/>
        <Stack.Screen
          name="Device" 
          component={DeviceScreen} 
          options={{
          headerShown: false,}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )*/
  /*return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView>
          <FindB/>
      </SafeAreaView>
    </GestureHandlerRootView>


    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='testBLE' 
          component={testBLE} 
          options={{
          headerShown: false,}}
        />
      </Stack.Navigator>
    </NavigationContainer>


  )};*/
export default App;