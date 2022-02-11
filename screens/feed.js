import * as React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import * as Font from 'expo-font';
var stories = require('./temporarystory.json');
import StoryCard from './Storycard'
import firebase from 'firebase'




export default class Feed extends React.Component {

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
 

  constructor() {
    super();
    this.state = {
      lighttheme: true,
      name: 'demo name',
      profileimage: 'https://wallpaperaccess.com/full/749909.jpg',
    };
  }
  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

  componentDidMount() {
    this.loadFont();
    this.fetchuser()
  }


  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.lighttheme ? 'white' : "#15193c",
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:20
          }}>
          <Image
            style={{
              width: 120,
              height: 100,
              resizeMode:'contain'
            }}
            source={require('../assets/logo.png')}
          />
          <Text
            style={{
              fontFamily: 'bubblegum-sans',
              fontSize: 20,
            }}>
            story telling app
          </Text>
        </View>
        <View
          style={{
            flex: 0.9,
          }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={stories}
            renderItem={({ item }) => {
              return <StoryCard navigation={this.props.navigation}  story={item}/>;
            }}
          />
        </View>
      </View>
    );
  }
}
