import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import appStyle from './Style';
import Icon from 'react-native-vector-icons/Ionicons';

const ToggleButton = ({ text, status, icon, onPress, style, children }) => (
  <TouchableOpacity style={{ paddingVertical: 10, flex: 1, flexDirection: 'row' }} onPress={() => onPress(status)}>
    <Icon name={icon} size={16} style={[(status ? appStyle.primary : appStyle.gray), { marginRight: 5 }]} />
    <Text style={[appStyle.base, style]}>{text}</Text>
    {children}
  </TouchableOpacity>
)

export default ToggleButton;
