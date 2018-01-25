import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

class AddDeck extends Component {
  render() {
    return (
      <View style={styles.center}>
        <Text> Add Deck </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default AddDeck
