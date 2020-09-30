import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import AppHeader from '../../../components/AppHeader';
import Card from '../../../components/Card';

export default class CancelSubscription extends Component {
  render () {
    return (
        <View style={{flex: 1}}>
        <AppHeader title="Cancel My Subscription" onLeftButtonPress={() => this.props.navigation.openDrawer()} />
        <ScrollView style={[styles.container, { backgroundColor: '#eee' }]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={true}>

            <Card title="Cancel Subscription" isShadow={true}>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>Subscription ID not found on this account. Please contact support to request for manual cancelling of subscription</Text>
              </View>
            </Card>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
    textContainer: {
    padding: 15
  },
    textStyle: {
    color: '#000',
    fontSize: 13,
    fontWeight: 'normal',
    marginBottom: 10
  }
});