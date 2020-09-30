import React from 'react';
import { ScrollView } from 'react-native';

import appStyle from './Style';

const FormView = ({ children, style, top, contentStyle }) => (
  <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    style={[appStyle.cx, style]}
    contentContainerStyle={contentStyle}
    contentInset={{ bottom: 30, top: (top || 0) }}>
    {children}
  </ScrollView>
)

export default FormView;
