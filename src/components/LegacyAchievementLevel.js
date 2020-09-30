/* @flow */

import React, { Component } from 'react';
import { View,Text,StyleSheet } from 'react-native';

import Card from '.././components/Card';
import appStyle from '.././components/Style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LegacyAchievementLevel extends Component {
  render() {
    return (
      <View style={[appStyle.card, appStyle.cardShadow, { flexDirection: 'row', padding: 10}]}>
        <Text style={styles.numberingStyle}>{this.props.numbering}</Text>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.titleStyle}>{this.props.title}</Text>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numberingStyle: {
    color: '#337ab7',
    fontSize: 36,
    fontWeight: '700',
  },
  titleStyle: {
    fontSize: 20
  }
});
