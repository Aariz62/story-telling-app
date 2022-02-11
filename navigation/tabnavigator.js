import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Feed from '../screens/feed';
import CreateStory from '../screens/createStory';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase'



const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component {

   fetchuser = async () => {
    await firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        this.setState({
          lighttheme: data.val().current_theme === 'dark' ? false : true,
          name: data.val().first_name + ' ' + data.val().last_name,
          profileimage: data.val().profile_picture,
        });
      });
  };


   componentDidMount() {
    this.fetchuser();
  }

  constructor() {
    super();
    this.state = {
      lighttheme: true,
      name: 'demo name',
      profileimage: 'https://wallpaperaccess.com/full/749909.jpg',
    };
  }
  render() {
    return (
      <Tab.Navigator
       labeled={true}
        activeColor="red"
        inactiveColor="black"
        barStyle={{
          backgroundColor: this.state.lighttheme ? "#eaeaea" : '#2f345d',
          overflow: 'hidden',
          position: 'absoulute',
          borderTopLeftRadius:30,
           borderTopRightRadius:30
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'CreateStory') {
              iconName = focused ? 'create' : 'create-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={RFValue(20)} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="CreateStory" component={CreateStory} />
      </Tab.Navigator>
    );
  }
}
