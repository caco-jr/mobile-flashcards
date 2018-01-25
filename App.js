import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import CustomStatusBar from './components/CustomStatusBar'
import { white, gray, blue } from './utils/colors'
import { getDecks, saveDeckTitle, removeDeck } from './utils/api'
import { objectToArray } from './utils/helpers'
import Tabs from './components/Tabs'
import DeckItemDetails from './components/DeckItemDetails'
import AddCard from './components/AddCard'

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
  DeckItemDetails: {
    screen: DeckItemDetails,
    navigationOptions: {
      title: 'Deck',
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
}, mainNavOptions)


class App extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    this.handleDecks();
  }

  handleDecks = () => {
    return getDecks()
      .then(decks => this.setState({ decks: objectToArray(decks) }))
  }

  submitDeck = (deckTitle) => {
    return saveDeckTitle(deckTitle)
      .then(this.handleDecks)
  }

  removeDeck = (deckTitle) => {
    return removeDeck(deckTitle)
      .then(this.handleDecks)
  }

  render() {
    const { decks } = this.state;
    screenProps = {
      decks,
      submitDeck: this.submitDeck,
      removeDeck: this.removeDeck,
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