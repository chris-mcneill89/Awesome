import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import logo from './assets/logo.jpg'

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height:159}} />
      <Text style={styles.bigBold}>Open up App.js to start working on your app!</Text>
      <Text style={styles.whiteText}>Hello World!</Text>
      <Text style={{color: '#900', fontSize: 18}}>To share a photo, press the button below!</Text>
      <TouchableOpacity 
        onPress={() => alert('Hello World!')} 
        style={{backgroundColor: 'blue'}}>
        <Text style={{ fontSize: 20, color: '#000'}}> Pick a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> Alert.alert('image clicked')}>
      <Image style={styles.otherLogo} source={{uri:'https://www.logodesign.net/images/illustration-logo.png',}}
      />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100
  },
  bigBold: {
    fontSize: 18,
    fontWeight: "bold"
  },
  otherLogo: {
    width: 200,
    height: 200
  },
  whiteText: {
    color: "white",
    alignItems: 'flex-end',
  }
});
