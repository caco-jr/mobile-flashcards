import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { white, lightGray, pink, black } from '../../utils/colors'
import { Ionicons } from '@expo/vector-icons'
import CardCount from '../CardCount'

const DeckItem = ({ deck, nav, screenProps }) => {
    return (
        <TouchableOpacity style={styles.deckItem}
            onPress={() => nav.navigate('DeckItemDetails', { deck: deck.item })}>

            <View>
                <CardCount style={styles.subTitle} cards={deck.item.cards} />
            </View>

            <View>
                <Text style={styles.titleText}>
                    {deck.item.title}
                </Text>
            </View>

            <View>
                <TouchableOpacity
                    onPress={() => screenProps.removeDeck(deck.item.title)}>

                    <Ionicons
                        style={{ margin: 4 }}
                        color={black}
                        size={30}
                        name={Platform.OS === 'ios' ? 'ios-trash-outline' : 'md-trash'} />

                </TouchableOpacity>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    deckItem: {
        height: 100,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: lightGray,
        backgroundColor: white,
        padding: 15,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: black
    },
    subTitle: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        margin: 4,
        color: black,
        borderColor: black,
    },
})

export default DeckItem