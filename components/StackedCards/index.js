import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { lightGray, black } from '../../utils/colors'
import CardCount from '../CardCount'

const StackedCards = ({ cards, topCardTitle, titleStyle }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.deck, { flex: 1, alignItems: 'stretch' }]}>
                <View style={{ backgroundColor: lightGray, height: 80, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[{ color: black }, titleStyle]} > {topCardTitle} </Text>
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
