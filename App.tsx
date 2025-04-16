// src/App.tsx

import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from './src/store/store'; // Import the store
import HomeScreen from './src/screens/homeScreen';
import Toast from 'react-native-toast-message';
import AccessibleToast from './src/utils/access';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
        <Toast
          config={{
            success: props => (
              <AccessibleToast
                {...props}
                type="success"
                text1={props.text1 || 'Default success message'}
              />
            ),
            error: props => (
              <AccessibleToast
                {...props}
                type="error"
                text1={props.text1 || 'Default error message'}
              />
            ),
            info: props => (
              <AccessibleToast
                {...props}
                type="info"
                text1={props.text1 || 'Default info message'}
              />
            ),
          }}
        />
      </NavigationContainer>
    </Provider>
  );
}
