import React, { Component } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

const Rating = ({ rate, iconColor, iconName }) => (
  <View style={{ flexDirection: 'row' }}>
  {_.range(rate || 0).map((item, index) => (
    <Icon key={index} color={iconColor} name={iconName || 'star'} />
  ))}
  </View>
);

export default Rating;
