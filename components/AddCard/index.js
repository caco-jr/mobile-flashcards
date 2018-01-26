import React, { Component } from 'react'
import {
    KeyboardAvoidingView,
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
} from 'react-native'
import { gray, darkGray, blue, white } from '../../utils/colors'
import { MaterialIcons } from '@expo/vector-icons'
import ThumbButtons from '../ThumbButtons'

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    }

    onPress = () => {
        const { navigation } = this.props
        const { deck } = navigation.state.params

        this.props.screenProps.submitCard(deck, this.state, navigation)

        return this.setState({ question: '', answer: '' })
    }

    render() {
        const { question, answer } = this.state;
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView behavior='padding' style={{ paddingLeft: 15, paddingRight: 15 }} >
                <View style={styles.boxQuestion} >
                    <Text style={styles.text}>Question</Text>

                    <TextInput
                        value={question}
                        style={styles.input}
                        onChangeText={(text) => this.setState({ question: text })} />
                </View>

                <View>
                    <Text style={styles.text}>Answer</Text>

                    <TextInput
                        value={answer}
                        style={styles.input}
                        onChangeText={(text) => this.setState({ answer: text })} />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}>
                    <Text style={{ color: white, textAlign: 'center', fontSize: 16 }} > Add Card </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: darkGray,
        fontSize: 21,
    },
    input: {
        height: 50,
        marginTop: 5,
        fontSize: 18,
        borderWidth: 1,
        borderColor: gray,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    button: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    boxQuestion: {
        marginTop: 15,
        marginBottom: 15,
    }
})

export default AddCard