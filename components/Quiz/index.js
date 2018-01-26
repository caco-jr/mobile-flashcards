import React, { Component } from 'react'
import { getDeck } from '../../utils/api'
import { setLocalNotification, clearNotifications } from '../../utils/helpers'
import Score from '../Score'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { red, gray, darkGray, white, blue, pink, lightGray, black } from '../../utils/colors'

class Quiz extends Component {
    state = {
        card: 0,
        deck: {},
        question: '',
        answer: '',
        showAnswer: false,
        quizComplete: false,
        rightAnswers: 0,
        cardCount: 1,
        flip: new Animated.Value(0),
        opacity: new Animated.Value(1),
        transX: new Animated.Value(0)
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params;

        getDeck(deck.title)
            .then((freshDeck) => {
                this.setState({
                    deck: freshDeck,
                    question: freshDeck.cards[0].question,
                    answer: freshDeck.cards[0].answer,
                    cardCount: freshDeck.cards.length,
                })
            })

        clearNotifications()
            .then(setLocalNotification)
    }

    passOrFail = (correct) => {
        let { card, cardCount, deck, transX, rightAnswers, answer, question } = this.state;
        card += 1;
        cardCount -= 1;

        if (correct) {
            rightAnswers += 1
        }

        if (card > cardCount) {
            return this.setState({ quizComplete: true, rightAnswers })
        }

        if (card <= cardCount) {
            question = deck.cards[card].question
            answer = deck.cards[card].answer
            return Animated.timing(transX, { toValue: -1000, duration: 300 }).start(() =>
                this.setState((state) => ({
                    ...state,
                    question,
                    answer,
                    rightAnswers,
                    card,
                    showAnswer: false,
                }))
            )
        }
    }

    calcScore = () => {
        const { rightAnswers, cardCount } = this.state
        return Math.round((rightAnswers / cardCount) * 100)
    }

    flipCard = () => {
        const { flip, opacity, showAnswer } = this.state;

        Animated.sequence([
            Animated.timing(opacity, { toValue: 0, duration: 300 }),
            Animated.timing(flip, { toValue: 180, duration: 300 }),
        ])
            .start(() => {
                this.setState({ showAnswer: !showAnswer })
                Animated.sequence([
                    Animated.timing(flip, { toValue: 0, duration: 0 }),
                    Animated.timing(opacity, { toValue: 1, duration: 300 }),
                ]).start()
            })
    }

    componentDidUpdate() {
        const { deck, transX, quizComplete } = this.state;

        if (quizComplete) {
            return this.props.navigation.navigate('Score', { score: this.calcScore(), deck })
        }

        Animated.timing(transX, { toValue: 0, duration: 300 }).start()
    }

    render() {
        const { deck, opacity, question, answer, card, flip, cardCount, showAnswer, transX } = this.state
        const animStyle = {
            transform: [
                {
                    rotateY: flip.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg'],
                    }),
                },
                { translateX: transX },
            ],
        }

        return (
            <View style={styles.container}>
                <View style={styles.countBar}>
                    <Text style={styles.countBarText}>
                        {cardCount - card} Remaining
                    </Text>
                </View>

                <Animated.View style={[styles.cardOuter, animStyle]}>
                    <Animated.View style={[styles.cardInner, { opacity }]}>
                        <View style={styles.cardCountCont}>
                            <Text style={styles.cardCountText}>
                                {card + 1}
                            </Text>

                            <Text style={styles.cardCountText}>
                                of
                            </Text>

                            <Text style={styles.cardCountText}>
                                {cardCount}
                            </Text>
                        </View>

                        <View style={styles.info}>
                            <View style={styles.infoCont}>
                                <Text style={styles.infoText} >{showAnswer ? `Answer: ${answer}` : `Question: ${question}`}</Text>
                            </View>

                            <View style={styles.infoCont}>
                                <TouchableOpacity
                                    onPress={() => this.flipCard()}>
                                    <Text style={styles.answerToggleBtnText}>Show {showAnswer ? 'Question' : 'Answer'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </Animated.View>

                <View style={styles.buttonCont}>
                    <TouchableOpacity
                        onPress={() => this.passOrFail(true)}
                        style={styles.buttonVote}>

                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                            size={80}
                            color={'green'} />
                        <Text style={styles.textVote}> Correct </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.passOrFail(false)}
                        style={styles.buttonVote}>

                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-sad-outline' : 'md-sad'}
                            size={80}
                            color={red} />
                        <Text style={styles.textVote} > Incorrect </Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerToggleBtnText: {
        color: red,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardOuter: {
        flex: 1,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 4,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        backgroundColor: white,
        borderRadius: 5,
    },
    cardInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardCountCont: {
        backgroundColor: lightGray,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        minWidth: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardCountText: {
        color: black,
    },
    countBar: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        backgroundColor: pink,
        marginBottom: 15,
    },
    buttonVote: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    textVote: {
        textAlign: 'center',
        fontSize: 18,
    },
    countBarText: {
        fontSize: 20,
        color: white,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        color: gray,
        fontSize: 20,
    },
})

export default Quiz
