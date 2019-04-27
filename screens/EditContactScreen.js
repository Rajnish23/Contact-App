import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert,
  ScrollView
} from 'react-native';

import { Form, Item, Input, Label, Button } from 'native-base';

export default class EditContactScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      key: "",
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam('key', '');
      //TODO populate state with key
      this.getcontact(key);
    })
  }

  getcontact = async (key) => {

    await AsyncStorage.getItem(key)
      .then(
        contactJsonString => {
          var contact = JSON.parse(contactJsonString);
          //set key with this key
          contact['key'] = key;
          //set staate
          this.setState(contact)
        }
      )
      .catch(error => {
        console.log(error);
      })
  }

  updateContact = async (key) => {
    if (this.state.fname !== '' &&
      this.state.lname !== '' &&
      this.state.phone !== '' &&
      this.state.email !== '' &&
      this.state.address !== '') {

      var contact = {
        fname: this.state.fname,
        lname: this.state.lname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address,
      }

      await AsyncStorage.mergeItem(key, JSON.stringify(contact))
        .then(() => {
          this.props.navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  static navigationOptions = {
    title: "Edit Contact"
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <ScrollView>
            <Form>
              <Item style={styles.inputItem}>
                <Label style={styles.labelText}  >First Name : </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={this.state.fname}
                  onChangeText={fname => this.setState({ fname })}></Input>
              </Item>
              <Item style={styles.inputItem}>
                <Label style={styles.labelText}  >Last Name : </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={this.state.lname}
                  onChangeText={lname => this.setState({ lname })}></Input>
              </Item>
              <Item style={styles.inputItem}>
                <Label style={styles.labelText} >Phone : </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={this.state.phone}
                  onChangeText={phone => this.setState({ phone })}></Input>
              </Item>
              <Item style={styles.inputItem}>
                <Label style={styles.labelText} >Email : </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}></Input>
              </Item>
              <Item style={styles.inputItem}>
                <Label style={styles.labelText} >Address : </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  value={this.state.address}
                  onChangeText={address => this.setState({ address })}></Input>
              </Item>
            </Form>
          
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => {
              this.updateContact(this.state.key);
            }}>
            <Text style={styles.buttonText}>Update</Text>
          </Button>
          <View style={styles.empty}></View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#ff7043",
    marginTop: 40
  },
  labelText:{
    fontWeight: 'bold',
    fontSize: 14,
    color: '#ff7043'
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});
