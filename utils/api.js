import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'mobileFlashCards:decks'

// get All Decks
export const getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(decks => {
            return JSON.parse(decks)
        })
}

// get a especific Deck
export const getDeck = (deckTitle) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(deck => {
            return JSON.parse(deck)[deckTitle]
        })
}