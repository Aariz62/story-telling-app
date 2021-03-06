import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';

export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakercolor: 'red',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  intiate = () => {
    this.state.speakercolor === 'red'
      ? (Speech.speak(
          this.props.route.params.story.title +
            'by' +
            this.props.route.params.story.author
        ),
        Speech.speak(this.props.route.params.story.story)
     ,
        this.setState({ speakercolor: 'gray' }))
      : (Speech.stop(), this.setState({ speakercolor: 'red' }));
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <ScrollView style={styles.cardContainer}>
          <Image
            source={require('../assets/story_image_1.png')}
            style={styles.storyImage}></Image>

          <View style={styles.titleContainer}>
            <Text style={styles.storyTitleText}>
              {this.props.route.params.story.title}
            </Text>
            <Text style={styles.storyAuthorText}>
              {this.props.route.params.story.author}
            </Text>
            <Text style={styles.descriptionText}>
              {this.props.route.params.story.story}
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.intiate}
            style={styles.actionContainer}>
            <View
              style={[
                styles.likeButton,
                {
                  backgroundColor:
                    this.state.speakercolor === 'red' ? 'red' : 'gray',
                },
              ]}>
              <Ionicons
                name={'volume-high-outline'}
                size={RFValue(30)}
                color={'white'}
              />
              <Text style={styles.likeText}>12k</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
