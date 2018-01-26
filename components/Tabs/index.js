import React from 'react';
import Decks from '../Decks'
import AddDeck from '../AddDeck'
import { TabNavigator } from 'react-navigation'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { white, blue, lightGray } from '../../utils/colors'

const tabOptions = {
  navigationOptions: {
    header: null,
  },
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: blue,
    inactiveTintColor: lightGray,
    style: {
      height: 56,
      padding: 4,
      backgroundColor: white,
    },
  },
}

export default Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons color={tintColor} size={30} name='cards' />,
      tabBarLabel: 'Decks',
      title: 'Decks',
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <MaterialIcons color={tintColor} size={30} name='library-add' />,
      tabBarLabel: 'Add Deck',
      title: 'Add Deck',
    },
  },
}, tabOptions)
