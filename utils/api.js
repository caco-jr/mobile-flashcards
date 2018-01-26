import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'mobileFlashCards:decks'

// Get All Decks
export const getDecks = () => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(decks => {
            return JSON.parse(decks)
        })
}

// Get a specific Deck
export const getDeck = (deckTitle) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(deck => {
            return JSON.parse(deck)[deckTitle]
        })
}

// Add a new deck
export const saveDeckTitle = (deckTitle) => {
    deck = {
        [deckTitle]: {
            title: deckTitle,
            cards: []
        }
    }
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck))
        .then(() => {
            getDecks()
        })
}

// Remove a specific Deck
export const removeDeck = (deckTitle) => {
    return getDecks()
        .then(decks => {
            delete decks[deckTitle]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
        })
}

// Add a card to a deck
export const addCardToDeck = (deckTitle, card) => {
    return getDeck(deckTitle)
        .then((deck) => {
            deck.cards.push(card)
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [deckTitle]: deck }))
        }).then(() => getDecks())
}