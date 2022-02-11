import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/drawernavigation"
import Login from "./screens/login"
import Loading from "./screens/loading"
import Dashboard from "./screens/dashboard"
import {createSwitchNavigator,createAppContainer} from 'react-navigation' 
import {firebaseConfig} from "./config"
import firebase from "firebase"

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const SwitchNavigator=createSwitchNavigator({
  Loading:Loading,
  Login:Login,
  Dashboard:Dashboard
})

const AppContainer = createAppContainer(SwitchNavigator)