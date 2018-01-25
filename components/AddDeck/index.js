import React, { Component } from 'react'
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { gray, darkGray, white, blue, pink } from '../../utils/colors'

class AddDeck extends Component {
  state = {
    input: '',
  }

  onChangeText = (input) => {
    return this.setState({ input })
  }

  onPress = () => {
    const { submitDeck } = this.props.screenProps
    submitDeck(this.state.val)
      .then(() => {
        this.props.navigation.navigate('DeckItemDetails', { deck: { title: this.state.input } });
        this.setState({ input: '' });
      })
  }

  render() {
    const { input } = this.state;

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.center}>
          <MaterialCommunityIcons color={blue} size={80} name='library-books' />
          <Text style={styles.text}>Create a new Deck</Text>
        </View>

        <View style={styles.sameLine} >
          <TextInput
            value={input}
            onChangeText={this.onChangeText}
            placeholder="Ex: React"
            style={styles.input}
            placeHolder='Deck Label' />

          <TouchableOpacity
            onPress={this.onPress}
            style={[styles.button, styles.center]}>
            <Text style={styles.buttonText}>CREATE</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: darkGray,
    fontSize: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 15,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sameLine: {
    flexDirection: 'row',
    marginTop: 30,
  },
  input: {
    height: 40,
    flex: 2,
    marginLeft: 1,
    marginRight: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: gray,
    padding: 10,
  },
  button: {
    backgroundColor: pink,
    height: 40,
    flex: 1,
    borderTopRightRadius: 6,
  },
  buttonText: {
    color: white,
  },
})

export default AddDeck