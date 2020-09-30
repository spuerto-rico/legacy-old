import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import appStyle from './Style';
import Icon from 'react-native-vector-icons/Ionicons';

const IconList = ({ icon, style }) => (
  <TouchableOpacity style={{ paddingVertical: 10, marginHorizontal: 20 }}>
    <Icon name={icon} size={40} style={{ color: '#020433'}}/>
  </TouchableOpacity>
)

export default IconList;
