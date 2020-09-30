import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';

import appStyle from './Style';

const ContentView = ({ children }) => (
  <KeyboardAvoidingView style={appStyle.cx} behavior="padding">
    <SafeAreaView style={appStyle.cx}>
      {children}
    </SafeAreaView>
  </KeyboardAvoidingView>
)

export default ContentView;
