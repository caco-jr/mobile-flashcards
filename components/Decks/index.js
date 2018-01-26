import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import DeckItem from '../DeckItem'
import { gray, red, white } from '../../utils/colors'
import { FontAwesome } from '@expo/vector-icons'

const renderListItem = ({ deck, navigation, screenProps }) => {
    return <DeckItem nav={navigation} screenProps={screenProps} deck={deck} />
}

const keyExtractor = (item, idx) => {
    return idx
}

const Decks = ({ navigation, screenProps }) => {
    const { decks } = screenProps
    return (
        decks && decks.length
            ? <View style={{ flex: 1 }}>
                <FlatList
                    data={decks}
                    renderItem={(deck) => renderListItem({ deck, navigation, screenProps })}
                    keyExtractor={keyExtractor} />
            </View>
            : <Text> Add a New Deck </Text>
    )
}

styles = StyleSheet.create({
    decks: {
        flex: 1,
    },
    titleCard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: white,
        borderColor: gray,
        borderWidth: 4,
        borderRadius: 4,
        margin: 3,
    }
})

export default Decks