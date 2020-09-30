import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Input = ({ placeholder, secureText, containerStyle, value, onChangeText, editable, multiLine, maxLength, keyboardType}) => (
  <View style={containerStyle}>
    <TextInput 
      autoCapitalize="none" 
      autoCompleteType="off"
      autoCorrect={false}
      placeholder={placeholder} 
      value={value} 
      secureTextEntry={secureText} 
      editable={editable} 
      style={[styles.InputDes, multiLine ? styles.inputIsMultiLine : styles.inputNotMultiline]} 
      onChangeText={onChangeText} 
      multiline={multiLine} 
      maxLength={maxLength} k
      eyboardType={keyboardType}
      />
  </View>
);

export default Input;

const styles = StyleSheet.create({
  InputDes: {
    paddingVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 5,
    paddingLeft: 5,
  },
  inputNotMultiline: {
    height: 40
  },
  inputIsMultiLine: {
    height: 120,
    textAlignVertical: 'top'
  }
});
