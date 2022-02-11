import * as React from 'react';
import { Text, View, StyleSheet, Image, Switch } from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';

export default class Profile extends React.Component {
  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

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
    this.loadFont();
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

  toggleSwitch = () => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({
        current_theme: this.state.lighttheme ? 'dark' : 'light',
      });

    this.setState({
      lighttheme: !this.state.lighttheme,
    });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.lighttheme ? 'white' : '#2f345d',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={{ uri: this.state.profileimage }}
        />
        <Text
          style={{
            fontSize: 15,
          }}>
          {this.state.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 50,
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            dark theme
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={this.state.lighttheme ? 'red' : 'green'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={!this.state.lighttheme}
            style={{
              marginLeft: 20,
            }}
          />
        </View>
      </View>
    );
  }
}
