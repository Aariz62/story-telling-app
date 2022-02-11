import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StackNavigator from './StackNavigation';
import Profile from "../screens/profile"
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logout from '../screens/logout'

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    );
  }
}