import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ListItemContainer from './ListItemContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListItem = ({ items, onCheck }) => (
  <View>
    {items.map((data, key) => {
      return (
        <View key={key}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={[styles.type, {flex: 1}]}>{data.type}</Text>
          </View>
            {data.compass.map((item, id)=>(
              <ListItemContainer key={id}>
                <View style={styles.borderContainer}>
                  <View style={[{flexDirection: 'row', paddingBottom: 0}, styles.container]}>
                    <Ionicons name="md-square-outline" size={20} color="black" style={{marginRight: 10}} />
                    <Text style={[{flex: 1}, styles.type]}>{item[0]}</Text>
                  </View>
                  <View style={{paddingLeft: 33, paddingVertical: 10}}>
                    <Text>{item[2]}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={[styles.borderContainerTop, styles.borderContainerRight, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}]}>
                      <Ionicons name="ios-create" size={20} color="black" style={{marginRight: 10}} />
                      <Text style={styles.type}>Edit</Text>
                    </View>
                    <View style={[styles.borderContainerTop, {flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}]}>
                      <Ionicons name="ios-trash" size={20} color="black" style={{marginRight: 10}} />
                      <Text style={styles.type}>Delete</Text>
                    </View>
                  </View>
                </View>
              </ListItemContainer>
            ))}
        </View>
      )
    })}
  </View>
);

// <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingVertical: 5}}>
//   <View style={{flexDirection: 'row', flex: 1}}>
//     <TouchableOpacity onPress={onCheck}>
//       <FontAwesome name="check-square" size={20} color="gray" style={{marginRight: 10}} />
//     </TouchableOpacity>
//     <Text style={[styles.type, {fontSize: 16, fontWeight: '500'}]}>{item[0]}</Text>
//   </View>
//   <FontAwesome name={item[1]} size={20} />
//
// </View>
// <View style={{paddingTop: 5}}>
//   <Text style={styles.type}>{data.name}</Text>
// </View>
// <View>
//   <TextInput editable={false}  value="text" style={{height: 40, width: '100%'}} />
//   <TextInput editable={false} value="07/19/2018 10:07 AM" style={{height: 40, width: '100%'}} />
// </View>

export default ListItem;

const styles = StyleSheet.create({
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 3
  },
  borderContainerTop: {
    borderTopWidth: 1,
    borderColor: '#eee',
    borderRadius: 3
  },
  borderContainerRight: {
    borderRightWidth: 1,
    borderColor: '#eee',
    borderRadius: 3
  },
  borderContainerLeft: {
    borderLeftWidth: 1,
    borderColor: '#eee',
    borderRadius: 3
  },
  container: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
