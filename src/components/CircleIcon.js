import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CircleIcon = ({ text, circleContainer, color }) => (
  <View style={[styles.container, circleContainer]}>
    <Icon name="circle" size={13} color={color} style={styles.circleIcon}/>
    <Text style={styles.TextSize}>{text}</Text>
  </View>
);

export default CircleIcon;

const styles = StyleSheet.create({
container: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 3
},
circleIcon: {
  marginRight: 8,
},
TextSize: {
  fontSize: 15
}
});
