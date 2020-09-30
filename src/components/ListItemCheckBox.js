import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import ListItemContainer from './ListItemContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from './Input';
import FormGroup from './FormGroup';
import Button from './Button';

const ListItemCheckBox = ({ items, onCheck, onEdit, onDelete, onFocusDate, onFocusTime, selectedTime, selectedDate }) => (
  <View>
    {items.map((data, key) => {
      return (
        <View key={key}>
          <View style={{flexDirection: 'row', paddingBottom: 6, paddingTop: 10, paddingHorizontal: 10}}>
            <Text style={[styles.type, {flex: 1}]}>{data.type}</Text>
          </View>
            {data.compass.map((item, id)=>(
              <ListItemContainer key={id} color="#7ABD81" plainBackground={true}>
                <View style={[{flexDirection: 'row'}, styles.borderContainer, styles.container]}>
                  <Ionicons name="md-square-outline" size={20} color="black" style={{marginRight: 10}} />
                  <Text style={[{flex: 1}, styles.type]}>Business</Text>
                  <Ionicons name="ios-arrow-forward" size={20} color="black"/>
                </View>

                <View style={{paddingTop: 15}}>
                  <FormGroup textLabel="Goal" placeholder={item[2]} editable={true} inputStyle={{borderRadius: 3, height: 80}} multiline={true}  />
                  <View style={{flexDirection: 'row'}}>
                    <FormGroup textLabel="Date" placeholder={`Due date`} value={selectedDate} editable={false} onPress={onFocusDate} inputStyle={{borderRadius: 3}} inputContainerStyle={{marginRight: 5}} />
                    <FormGroup textLabel="Time" placeholder={`Time`} value={selectedTime} editable={false} onPress={onFocusTime} inputStyle={{borderRadius: 3}} />
                  </View>
                  <Button text="Save Commitments" textColor="white" buttonStyle={{backgroundColor: '#7ABD81'}} />
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
//   <TextInput placeholder={item[2]} style={{height: 40, width: '100%'}} />
//   <TextInput placeholder="Due date" style={{height: 40, width: '100%'}} />
//
// </View>
// <View style={{flexDirection: 'row', justifyContent: 'space-between' }}>
//   <TouchableOpacity onPress={onEdit}>
//     <FontAwesome name="edit" color="gray" size={20} />
//   </TouchableOpacity>
//   <TouchableOpacity onPress={onDelete}>
//     <FontAwesome name="trash" color="gray" size={20} />
//   </TouchableOpacity>
// </View>

export default ListItemCheckBox;

const styles = StyleSheet.create({
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black'
  },
  borderContainer: {
    borderWidth: 1,
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
