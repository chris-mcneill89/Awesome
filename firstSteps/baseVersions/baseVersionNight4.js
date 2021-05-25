import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Platform, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import logo from './assets/logo.jpg';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);


  let openImageImagePickerAsync = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true) {
      return
    }

    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }

    setSelectedImage ({ localUri: pickerResult.uri });
  };

  let openShareDialogAsync = async() => {
    if (!(await Sharing.isAvailableAsync)) {
      alert("The image is available for sharing at: ${selectedImage.remoteUri}");
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }; 

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this Photo</Text>
        </TouchableOpacity>
      </View>
      );
  }


  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height:159}} />
      <Text style={styles.bigBold}>Open up App.js to start working on your app!</Text>
      <Text style={styles.whiteText}>Hello World!</Text>
      <Text style={{color: '#900', fontSize: 18}}>To share a photo, press the button below!</Text>
      <TouchableOpacity 
        onPress={openImageImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}> Pick a photo</Text>
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
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  }
});
