import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import AppHeader from '../../../components/AppHeader';
import Card from '../../../components/Card';
import FormInline from '../../../components/FormInline';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export default class MyPURL extends Component {

  constructor(props) {
    super(props);
    this.state = { url: 'A0058wDjj73b' }
  }

  render () {
    return (
      <View style={{flex: 1}}>
      <AppHeader title="My PURL" onLeftButtonPress={() => this.props.navigation.openDrawer()} />
      <ScrollView style={[styles.container, { backgroundColor: '#eee' }]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={true}>

         <Card title="My PURL" isShadow={true}>
           <View style={styles.textContainer}>
             <Text style={styles.textStyle}>To change your PURL (name of your Legacy Network website), enter name in space provided below and update.</Text>
             <FormInline label="Personal URL">
               <Input
                 placeholder={this.state.url}
                 value={this.state.url}
                 onChangeText={(url) => this.setState({url})}
                 containerStyle={{marginBottom: 10}}/>
               <TouchableOpacity onPress={() => {}}>
                 <Text style={styles.urlTextStyle}>View PURL</Text>
               </TouchableOpacity>
             </FormInline>
             <Button
               type="primaryV2"
               textColor="White"
               text="Update"
               buttonStyle={{flex: 1}}
               onPress={() => {}}/>
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
  },
  urlTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#337ab7'
  }
});