import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Tabs from './components/Tabs'
import CustomStatusBar from './components/CustomStatusBar'
import { white, gray, blue } from './utils/colors'

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
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <CustomStatusBar backgroundColor={blue} barStyle='light-content' />
        <MainNav />
      </View>
    )
  }
}

export default App