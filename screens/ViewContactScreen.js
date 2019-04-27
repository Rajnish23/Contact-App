import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';

import { Card, CardItem, Label } from 'native-base';

import { Entypo } from '@expo/vector-icons';

export default class ViewContactScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fname: "Dummy",
      lname: "Dummy",
      phone: "Dummy",
      email: "Dummy",
      address: "Dummy",
      key: "Dummy"
    }
  }


  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      var key = this.props.navigation.getParam("key", "");
      this.getContact(key);
    })
  }

  getContact = async (key) => {
    await AsyncStorage.getItem(key)
      .then(contactJsonString => {
        var contact = JSON.parse(contactJsonString);
        contact["key"] = key;
        this.setState(contact);
      })
      .catch(error => {
        console.log(error);
      })
  }

  callAction = (phone) => {
    let phoneNo = phone;
    if (Platform.OS !== "android") {
      phoneNo = `telprompt:${phone}`
    }
    else {
      phoneNo = `tel:${phone}`
    }

    Linking.canOpenURL(phoneNo)
      .then(supported => {
        if (!supported) {
          Alert.alert('Phone no is not available');
        }
        else {
          return Linking.openURL(phoneNo);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  smsAction = (phone) => {
    let phoneNo = phone;

    phoneNo = `sms:${phone}`

    Linking.canOpenURL(phoneNo)
      .then(supported => {
        if (!supported) {
          Alert.alert('Sms not opened');
        }
        else {
          return Linking.openURL(phoneNo);
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  editContact = (key) => {
    this.props.navigation.navigate("Edit",{key: key});
  }

  deleteContact = (key) => {
    Alert.alert(
      "Delete Contact ?", `${this.state.fname} ${this.state.lname}`,
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel")
        },
        {
          text: "Ok", 
          onPress: async () =>{
            await AsyncStorage.removeItem(key)
            .then(() => {
              this.props.navigation.goBack();
            })
            .catch(error => {
              console.log(error);
            })
          }
        }
      ]
    );
  }

  static navigationOptions = {
    title: 'View Contact'
  }

  render() {
    return (

      <ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>{this.state.fname[0].toUpperCase()}</Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{this.state.fname} {this.state.lname}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Card>
            <CardItem bordered>
              <Text style={styles.labelText}> Phone </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.phone}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.labelText}> Email </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.labelText}> Address </Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{this.state.address}</Text>
            </CardItem>
          </Card>
        </View>

        <Card style={styles.actionContainer}>
          <CardItem bordered
            style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.smsAction(this.state.phone);
              }}>
              <Entypo
                name="message"
                size={30}
                color="#ff7043"
                style={{alignSelf:"center"}} />
                <Text style={styles.labelText}>Send SMS</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered
            style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.callAction(this.state.phone);
              }}>
              <Entypo
                name="phone"
                size={30}
                color="#ff7043" 
                style={{alignSelf:"center"}}/>
                <Text style={styles.labelText}>Call</Text>
            </TouchableOpacity>
          </CardItem>

        </Card>
      
      
        <Card style={styles.actionContainer}>
          <CardItem bordered
            style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.editContact(this.state.key);
              }}>
              <Entypo
                name="edit"
                size={30}
                color="#ff7043"
                style={{alignSelf:"center"}} />
                <Text style={styles.labelText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>
          <CardItem bordered
            style={styles.actionButton}>
            <TouchableOpacity
              onPress={() => {
                this.deleteContact(this.state.key);
              }}>
              <Entypo
                name="trash"
                size={30}
                color="#ff7043"
                style={{alignSelf:"center"}} />
                <Text style={styles.labelText}>Delete</Text>
            </TouchableOpacity>
          </CardItem>

        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#673ab7"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#000'
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  },
  infoContainer: {
    flexDirection: 'column'
  },
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#673ab7"
  }
});
