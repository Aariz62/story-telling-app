import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import * as Font from 'expo-font';
var stories = require('./temporarystory.json');
import StoryCard from './Storycard';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase'

var images = {
  image1: require('../assets/story_image_1.png'),
  image2: require('../assets/story_image_2.png'),
  image3: require('../assets/story_image_3.png'),
  image4: require('../assets/story_image_4.png'),
  image5: require('../assets/story_image_5.png'),
};

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

  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
  };

  componentDidMount() {
    this.loadFont();
    this.fetchuser()
  }

  constructor() {
    super();
    this.state = {
      title: '',
      previewImage: 'image1',
      lighttheme:false
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behaviour="padding"
        style={{
          backgroundColor: this.state.lighttheme ? 'white' : '#2f345d',
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            flex: 0.1,
          }}>
          <Image
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
            }}
            source={require('../assets/logo.png')}
          />
          <Text
            style={{
              fontFamily: 'bubblegum-sans',
              fontSize: 20,
              marginLeft:20
            }}>
            Create Story
          </Text>
        </View>
        <View
          style={{
            flex: 0.9,
          }}>
          <ScrollView>
            <Image
              style={{
                width: '80%',
                height: 200,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={images[this.state.previewImage]}></Image>
            <DropDownPicker
              onChangeItem={(data)=>this.setState({
                previewImage:data.value
              })}
              items={[
                { label: 'image 1', value: 'image1' },
                { label: 'image 2', value: 'image2' },
                { label: 'image 3', value: 'image3' },
                { label: 'image 4', value: 'image4' },
                { label: 'image 5', value: 'image5' },
              ]}
            />
            <TextInput
              onChangeText={(title) =>
                this.setState({
                  title,
                })
              }
              placeholderTextColor={this.state.lighttheme ? "#2f345d" : 'white'}
              placeholder={'title'}
              style={{
                borderWidth: 1,
                borderColor: this.state.lighttheme ? "#2f345d" : 'white',
                borderRadius: 10,
                height: 40,
                paddingLeft: 10,
                color: this.state.lighttheme ? "#2f345d" : 'white',
                fontFamily: 'bubblegum-sans',
              }}></TextInput>

            <TextInput
              numberOfLines={4}
              multiline={true}
              onChangeText={(description) =>
                this.setState({
                  description,
                })
              }
              placeholderTextColor={this.state.lighttheme ? "#2f345d" : 'white'}
              placeholder={'description'}
              style={{
                borderWidth: 1,
                borderColor: this.state.lighttheme ? "#2f345d" : 'white',
                borderRadius: 10,
                height: 40,
                paddingLeft: 10,
                color: this.state.lighttheme ? "#2f345d" : 'white',
                fontFamily: 'bubblegum-sans',
              }}></TextInput>

            <TextInput
              numberOfLines={20}
              multiline={true}
              onChangeText={(story) =>
                this.setState({
                  story,
                })
              }
              placeholderTextColor={this.state.lighttheme ? "#2f345d" : 'white'}
              placeholder={'story'}
              style={{
                borderWidth: 1,
                borderColor: this.state.lighttheme ? "#2f345d" : 'white',
                borderRadius: 10,
                height: 40,
                paddingLeft: 10,
                color: this.state.lighttheme ? "#2f345d" : 'white',
                fontFamily: 'bubblegum-sans',
              }}></TextInput>

            <TextInput
              numberOfLines={4}
              multiline={true}
              onChangeText={(moral) =>
                this.setState({
                  moral,
                })
              }
              placeholderTextColor={this.state.lighttheme ? "#2f345d" : 'white'}
              placeholder={'moral'}
              style={{
                borderWidth: 1,
                borderColor:this.state.lighttheme ? "#2f345d" : 'white',
                borderRadius: 10,
                height: 40,
                paddingLeft: 10,
                color: this.state.lighttheme ? "#2f345d" : 'white',
                fontFamily: 'bubblegum-sans',
              }}></TextInput>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
