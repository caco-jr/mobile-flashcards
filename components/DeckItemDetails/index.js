import React, { Component } from 'react'
import { getDeck } from '../../utils/api'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { red, gray, white } from '../../utils/colors'
import StackedCards from '../StackedCards'
import ThumbButtons from '../ThumbButtons'

class DeckItemDetails extends Component {
    state = {
        deck: {}
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params;

        getDeck(deck.title)
            .then((freshDeck) => this.setState({ deck: freshDeck }))
    }

    render() {
        const { deck } = this.state
        const { title, cards } = deck
        return (
            <View style={styles.container}>
                <StackedCards
                    topCardTitle={title}
                    cards={cards} />


                <View style={{ flex: 1 }} >
                    <ThumbButtons
                        textOne={'Add Card'}
                        textTwo={'Pop Quiz'}
                        onPressOne={() => this.props.navigation.navigate('AddCard', { deck })}
                        onPressTwo={() => this.props.navigation.navigate('Quiz', { deck })}
                        hideButtonTwo={cards && !cards.length > 0} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: white,
    },
})

export default DeckItemDetails