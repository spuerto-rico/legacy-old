import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Container, Content, Toast} from 'native-base';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { tokenRequest } from '../actions';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {

  state = {
    username: 'partners@legacynetwork.com',
    password: 'bld'
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('accessToken')
      if(value !== null) {
        console.log(value)

        this.props.navigation.navigate('drawer')
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  onLogin = () => {
    console.log('testing');
    this.props.tokenRequest(this.state.username, this.state.password);
  }

  render() {

    return (
      <Container>
        <Content>
          <ScrollView style={{paddingTop: 150}} contentContainerStyle={{ padding: 16}}>
              <View style={ styles.compName }>
                <Text style={ styles.legacy }>legacy</Text>
                <Text style={ styles.network }>network</Text>
              </View>

              <Input
                placeholder="Username"
                value={this.state.username}
                containerStyle={{marginBottom: 15}}
                onChangeText={(username) => this.setState({username})}
                keyboardType="email-address" />

              <Input
                placeholder="Password"
                secureText={true}
                value={this.state.password}
                containerStyle={{marginBottom: 15}}
                onChangeText={(password) => this.setState({password})}
                />

              <Button
                type="info"
                textColor="white"
                text="Login"
                onPress={() => this.onLogin()}
              />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  compName: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  legacy: {
    fontSize: 30,
    color: '#00cdcd'
  },
  network: {
    fontSize: 25
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.currentUser,
});

// const mapDispatchToProps = {
//
// };

export default connect(mapStateToProps, { tokenRequest })(Login)
