import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.bigBold}>Open up App.js to start working on your app!</Text>
      <Text style={styles.whiteText}>Hello World!</Text>
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
