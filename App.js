import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Tabs from './components/Tabs'
import CustomStatusBar from './components/CustomStatusBar'
import { white, gray, blue } from './utils/colors'
import { getDecks } from './utils/api'
import { objectToArray } from './utils/helpers'

mainNavOptions = {
  headerMode: 'float',
  navigationOptions: {
    headerTintColor: white,
    headerStyle: {
      backgroundColor: gray,
    }
  }
}

MainNav = StackNavigator({
  Home: {
    screen: Tabs,
  },
}, mainNavOptions)


class App extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    getDecks()
      .then(decks => this.setState({ decks: objectToArray(decks) }))
  }

  render() {
    const { decks } = this.state;
    screenProps = {
      decks,
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CustomStatusBar backgroundColor={blue} barStyle='light-content' />
        <MainNav screenProps={screenProps} />
      </View>
    )
  }
}

export default App