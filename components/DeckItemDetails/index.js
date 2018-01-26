import React, { Component } from 'react'
import { getDeck } from '../../utils/api'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { red, gray, white, black } from '../../utils/colors'
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
                    cards={cards}
                    titleStyle={styles.title} />

                <View style={{ flex: 1 }} >
                    <ThumbButtons
                        textOne={'New card'}
                        textTwo={'Start Quiz'}
                        styleBox={styles.buttonBox}
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
        color: black,
    },
    buttonBox: {
        flexDirection: 'row',
        flex: 1,
    }
})

export default DeckItemDetails