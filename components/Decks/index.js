import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import DeckItem from '../DeckItem'
import { gray, red, white, blue } from '../../utils/colors'
import { FontAwesome } from '@expo/vector-icons'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

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
            : <View style={styles.center} >
                <SimpleLineIcons
                    color={blue}
                    size={90}
                    name="emotsmile" />
                <Text style={styles.emptyDecks} > Hey, let's start a new Deck </Text>
            </View>
    )
}

const styles = StyleSheet.create({
    decks: {
        flex: 1,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyDecks: {
        fontSize: 24,
        textAlign: 'center',
        margin: 30,
        color: gray,
    },
})

export default Decks