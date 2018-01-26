import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { red, gray, white } from '../../utils/colors'
import CardCount from '../CardCount'

const StackedCards = ({ cards, topCardTitle, titleStyle }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.deck, { flex: 1, alignItems: 'stretch' }]}>
                <View style={[{ backgroundColor: red, height: 80, alignItems: 'center', justifyContent: 'center' }, titleStyle]}>
                    <Text> {topCardTitle} </Text>
                </View>

                <View style={[styles.container, { justifyContent: 'center', alignSelf: 'center' }]}>
                    <CardCount cards={cards} style={{ fontSize: 40 }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    deck: {
        margin: 1,
        flex: 1,
        width: 380,
    },
})

export default StackedCards
