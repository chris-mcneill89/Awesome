import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import HomeScreen from './screens/homeScreen';

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();

const App = () => {

  // state = {appIsReady: false}

  // render() {
  //   if (!this.state.appIsReady) {
  //     return null;
  //   }

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'Welcome'}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default App