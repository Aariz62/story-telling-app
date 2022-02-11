import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from "expo-font"
import firebase from "firebase"


export default class Loading extends React.Component {

   checkifloggedin=()=>{
     firebase.auth().onAuthStateChanged((user)=>{
       if(user){
         this.props.navigation.navigate("Dashboard")
         
       }else{
         this.props.navigation.navigate("Login")
       }
     })
   }
   loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

  componentDidMount() {
    this.loadFont();
    this.checkifloggedin()
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
        <Text style={{fontFamily:'bubblegum-sans'}}>Loading screen</Text>
      </View>
    );
  }
}
