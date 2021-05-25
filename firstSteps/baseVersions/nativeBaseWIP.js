import React from 'react';
import AppLoading from 'expo-app-loading';
import { Image } from 'react-native';
import exampleImage from './assets/example.png'
import logoImage from './assets/logo.jpg'
import { Container, Header, Content, Body, Left, Right, Text, Card, CardItem, Thumbnail, Icon, Button, DatePicker } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const exampleImageUri = Image.resolveAssetSource(exampleImage).uri
const logoImageUri = Image.resolveAssetSource(logoImage).uri

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isReady: false, };
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }


  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }


    return (
      <Container>
        < Header>
          <Left style={{ backgroundColor: 'silver' }}>
            <Text style={{ color: '#ffffff' }}>Left</Text>
          </Left>
          <Body>
            <Text style={{ color: '#ffffff' }}>My Header</Text>
          </Body>
          <Right style={{ backgroundColor: 'silver' }}>
            <Text style={{ color: '#ffffff' }}>Right</Text>
          </Right>
        </Header>
        <Content>
          <Grid>
            <Col>
              <Text>First Column</Text>
            </Col>
            <Col>
              <Text>Second Column</Text>
            </Col>
          </Grid>
          <Card style={{ flex: 0 }}>
            <CardItem header>
              <Text style={{ color: '#8a2be2' }}>Card Header Text</Text>
            </CardItem>
            <CardItem>
              <Right>
                <Thumbnail source={{ uri: exampleImageUri }} />
                <Body>
                  <Text>Fancy Title Container</Text>
                  <Text note>Some Note Text</Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem>
              <Body style={{ flex: 1, alignItems: 'center' }}>
                <Image source={{ uri: logoImageUri }} style={{ height: 200, width: 200 }} />
                <Text style={{ color: 'azure', backgroundColor: '#dc143c' }}>Meet the Guys!!!</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: '#87838B' }}>
                  <Icon name='logo-github' />
                  <Text>GitHub Verified</Text>
                </Button>
              </Left>
            </CardItem>
            <CardItem footer button onPress={() => alert("This is Card Footer")}>
              <Text style={{ backgroundColor: 'gainsboro', color: 'black' }}>Big Ol Footer With A Big Ol Button</Text>
            </CardItem>
          </Card>
          <DatePicker
            defaultDate={new Date(2021, 3, 23)}
            minimumDate={new Date(2020, 1, 1)}
            maximumDate={new Date(2022, 1, 1)}
            value={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select Date"
            textStyle={{color: 'green'}}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false} />
          <Text>
            Date: {this.state.chosenDate.toString().substr(4, 12)}
          </Text>
        </Content>
      </Container>
    );
  }
}
