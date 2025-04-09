// src/App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from './src/store/store';  // Import the store
import HomeScreen from './src/screens/homeScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
