import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input, Item } from 'native-base';

function HomeScreen({ navigation }) {
  // this is React wizardry...it's called a state hook
  // text is a state and setText is a function to change text
  // text is the variable name, setText is the function used to update text, useState('') initializes test as a blank string
  const [text, setText] = React.useState('');
  const [counter, setCounter] = React.useState(0);

  return (
    // In Button below react-navigation uses the onPress property
    // {() => navigation.navigate('Welcome', {myName: text})}
    // 'Welcome' is the screen referenced in line 52
    // {myName: text} allows you you to send data between pages
    // In this case the value of the text variable in line 11
    <Container style={{
      flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <Item regular>
        <Input
          placeholder='What is your name?'
          value={text} // text const from line 13
          onChangeText={text => setText(text)} // this is a shorthand way of writing js functions
        />
      </Item>
      <Button onPress={() => navigation.navigate('Welcome', { myName: text, myCount: counter })} block bordered primary>
        <Text>Submit</Text>
      </Button>
      <Button onPress={() => setCounter(counter + 1)} block bordered primary>
        <Text>Increment</Text>
      </Button>
      <Text>{counter}</Text>
    </Container>
  );
}

function WelcomeScreen({ route, navigation }) {
  const { myName, myCount } = route.params;
  const [location, setLocation] = React.useState('');
  const [newCount, setNewCount] = React.useState(myCount);


  return (
    <Container style={{
      flex: 1, alignItems: 'center', justifyContent: 'center'
    }}>
      <Text>Welcome {myName}</Text>
      <Item regular>
        <Input
          placeholder='Where are you From?'
          value={location}
          onChangeText={location => setLocation(location)}
        />
      </Item>
      <Button onPress={() => navigation.navigate('Details', { myLocation: location, name: myName, finalCount: newCount })} block bordered primary>
        <Text>Submit</Text>
      </Button>
      <Button onPress={() => setNewCount(newCount + 1)} block bordered primary>
        <Text>Increment</Text>
      </Button>
      <Text>{newCount}</Text>
    </Container>
  );
}

function DetailsScreen({ route, navigation }) {
  const { myLocation, name, finalCount } = route.params;
  return (
    <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', padding: 20, backgroundColor: 'red' }}>{name} is from {myLocation} and {name} pressed the increment button {finalCount} times</Text>
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
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;