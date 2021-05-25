import * as React from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, Button, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { decode } from 'html-entities';

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const HomeScreen = ({ navigation }) => {
    // this is React wizardry...it's called a state hook
    // text is a state and setText is a function to change text
    // text is the variable name, setText is the function used to update text, useState('') initializes test as a blank string
    const [data, setData] = React.useState([]);
    const [response, setResponse] = React.useState([]);

    const getData = (data) => { setData(data) };
    const getResponse = (response) => { setResponse(response) };

    const getResponseDataApi = async () => {
        //if the response state is empty, do this else do not do it again
        try {
            let apiResponse = await fetch('https://opentdb.com/api.php?amount=4');
            let responseJson = await apiResponse.json();
            // Alert.alert(JSON.stringify(responseJson.results[0].question));
            getResponse(responseJson);
            return responseJson;
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const getQuestions = async (inputResponse) => {
        Alert.alert("getQs - " + inputResponse.results[0].question);

        let questions = await loopResponse(inputResponse);
        getData(questions);
    }

    const getCorrectAnswers = async (inputResponse) => {
        try {
            getData(inputResponse.results.correct_answer);
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    const loopResponse = async (inputResponse) => {
        let questions = [];
        for (let index = 0; index < inputResponse.results.length; index++) {
            try {
                questions.push(inputResponse.results[index].question);
            } catch (error) {
                Alert.alert(error.message);
            }
        }
        const result = await Promise.all(questions);
        return result;
    }

    if (response.length < 1) {
        getResponseDataApi().then((result) => getQuestions(result))
        //try to chain with get answers .then + reuse loop method with param input
        // getQuestions(response);
        // getCorrectAnswers(response);
    }

    const renderItem = ({ item }) => (
        <Item title={decode(item)} />
      );
    
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
          />
        </SafeAreaView>
      );

}

//**********************STYLES**************************
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: 'blueviolet',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 12,
        color: 'azure'
    },
});

export default HomeScreen
