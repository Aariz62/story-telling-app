import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from "expo-font"
import firebase from 'firebase'


export default class Logout extends React.Component {

   loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

  componentDidMount() {
    this.loadFont();
    firebase.auth().signOut()
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'teal',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontFamily:'bubblegum-sans'}}>logout screen</Text>
      </View>
    );
  }
}
