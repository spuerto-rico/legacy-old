/* @flow weak */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TeamMembers = ({ text }) => (
  <View style={{ padding: 10 }}>
    <TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    <View style={styles.imageLevel}>
      <Text style={styles.textLevel}>0</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Icon color="#cccccc" style={{ fontSize:20 }} name="star" />
      <Icon color="#cccccc" style={{ fontSize:20 }} name="star" />
      <Icon color="#cccccc" style={{ fontSize:20 }} name="star" />
    </View>
  </View>
);

export default TeamMembers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#337ab7'
  },
  imageLevel: {
      position: 'absolute',
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 25,
      backgroundColor: '#2e69aa',
      justifyContent: 'center',
      alignItems: 'center'
  },
  textLevel: {
      fontSize: 15,
      color: 'white'
  }
});
