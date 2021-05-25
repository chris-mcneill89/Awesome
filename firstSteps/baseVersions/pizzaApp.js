import * as React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input, Item } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import pizza from './assets/pizza.jpg';

let arrEmailAddresses = [];

function HomeScreen({ navigation }) {
  // this is React wizardry...it's called a state hook
  // text is a state and setText is a function to change text
  // text is the variable name, setText is the function used to update text, useState('') initializes test as a blank string
  const [text, setText] = React.useState('');
  const [counter, setCounter] = React.useState(0);

  return (
    <Container>
      <Grid>
        <Row style={styles.topRow}>
          <Image source={pizza} style={styles.thumbnail} />
        </Row>
        <Row style={styles.middleRow}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.bigBold}>Mario's Pizza</Text>
            <Text style={styles.basicText}>The best pizza in Belfast</Text>
          </View>
        </Row>
        <Row style={styles.bottomRow}>
          <View style={styles.bottomRowView}>
            <Item style={styles.emailInput}>
              <Input
                placeholder='Email address'
                value={text}
                onChangeText={text => setText(text)}
              />
            </Item>
            <Button onPress={() => navigation.navigate('Welcome', { myEmail: text })} block bordered primary
              style={styles.emailButton} >
              <Text>Get updates from Mario's Pizza</Text>
            </Button>
          </View>
        </Row>
      </Grid>
    </Container>
  );
}

function WelcomeScreen({ route, navigation }) {
  const { myEmail } = route.params;
  let strMessage;

  if (arrEmailAddresses.includes(myEmail)) {
    strMessage = "The address " + myEmail + " is already in our mailing list"
  } else {
    arrEmailAddresses.push(myEmail);
    strMessage = "We will send updates to " + myEmail
  }


  return (
    <Container style={styles.welcomeStyle}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.bigBold}>Welcome to Mario's</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.basicText}>{strMessage}</Text>
      </View>
    </Container>
  );
}

// this last section always needs to be in your App.js file
const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
  topRow: {
    backgroundColor: 'olive',
    height: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRow: {
    backgroundColor: '#FFFFFF',
    height: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomRow: {
    backgroundColor: 'red',
    height: '33.3%',
    justifyContent: 'center',
  },
  bottomRowView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  basicText: {
    fontSize: 18,
    textAlign: 'center'
  },
  bigBold: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center'
  },
  emailInput: {
    backgroundColor: '#FFFFFF',
    width: "100%"
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
  emailButton: {
    backgroundColor: 'darkgrey',
    width: "100%",
    textAlign: 'center'
  },
  welcomeStyle: {
    backgroundColor: 'red',
    justifyContent: 'center',
  }
});
