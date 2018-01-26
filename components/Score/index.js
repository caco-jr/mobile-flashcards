import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import { resetToDeck } from '../../utils/helpers'
import { gray, red, white, lightGray } from '../../utils/colors'

class Score extends Component {
    state = {
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        const { bounceValue } = this.state
        Animated.sequence([
            Animated.timing(bounceValue, { toValue: 2 }),
            Animated.spring(bounceValue, { toValue: 1 }),
        ]).start()
    }

    render() {
        const { bounceValue } = this.state;
        const { navigation } = this.props;
        const { score, deck } = navigation.state.params;
        const scoreColor = score > 70 ? 'green' : red;

        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Animated.View style={[styles.scoreCont, { transform: [{ scale: bounceValue }] }]}>
                        <Text style={{ color: white, textAlign: 'center', fontSize: 40 }}>
                            You're Score is
                            <Text style={{ fontSize: 50, color: scoreColor }}> {score}%</Text>
                        </Text>
                    </Animated.View>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => navigation.navigate('Quiz', { deck })}>

                        <Text style={[styles.linkText, { color: red }]}>Try again</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.link}
                        onPress={() => navigation.dispatch(resetToDeck(deck))}>
                        <Text style={[styles.linkText, { color: gray }]}>Go Back to the {deck.title} Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreCont: {
        backgroundColor: lightGray,
        padding: 8,
        borderRadius: 8,
        margin: 15,
    },
    link: {
        padding: 10,
    },
    linkText: {
        fontSize: 20,
    },
})

export default Score