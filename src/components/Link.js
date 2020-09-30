/* @flow */

import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Link extends Component {

  render() {

    const textColor = this.props.textColor ? { color: this.props.textColor } : {};
    const alignItems = this.props.alignItems ? { alignItems: this.props.alignItems } : {};

    return (
      <TouchableOpacity style={[ alignItems ]} onPress={this.props.onPress}>
        <Text style={[textColor, { fontWeight: 'bold' }]}>{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  link: {
    alignItems: 'center',
    justifyContent : 'center',
    paddingVertical: 10,
    borderRadius: 4,
    flexDirection: 'row'
  },
  text: {
    fontSize: 19,
  }
});
