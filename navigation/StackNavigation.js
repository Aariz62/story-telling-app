import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from "expo-font"
import { createStackNavigator } from '@react-navigation/stack';
import Tabnavigator from "./tabnavigator"
import StoryScreen from "../screens/StoryScreen"

const Stack = createStackNavigator();


export default class StackNavigator extends React.Component {

   loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

  componentDidMount() {
    this.loadFont();
  }

  render() {
    return (
     <Stack.Navigator screenOptions={{
       headerShown:false
     }}>
      <Stack.Screen name="Tabnavigator" component={Tabnavigator} />
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
    );
  }
}
