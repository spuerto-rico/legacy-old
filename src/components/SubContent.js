/* @flow */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class SubContent extends PureComponent {

  onPressCall() {
  	const url = 'telprompt:5551231234';
  	Linking.canOpenURL(url)
  		.then((supported) => {
  			if (supported) {
  				return Linking.openURL(url)
  					.catch(() => null);
  			}
  		});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onPressCall()}>
            <Icon style={{ fontSize: 20, color: '#7dc476' }} name="phone"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:support@example.com')}>
            <Icon style={{ marginLeft: 30, fontSize: 20, color: '#7dc476' }} name="envelope"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
     fontSize: 15,
     color: 'black',
     marginBottom: 5
  }
});
