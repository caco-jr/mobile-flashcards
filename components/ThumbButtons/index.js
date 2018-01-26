import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, darkGray, pink } from '../../utils/colors'
import { EvilIcons, Ionicons } from '@expo/vector-icons'

class ThumbButtons extends Component {
    render() {
        const { hideButtonTwo, onPressOne, onPressTwo, textOne, textTwo, styleBox } = this.props;
        return (

            <View style={styleBox || styles.container}>
                <View >
                    <TouchableOpacity style={styles.button}
                        onPress={onPressOne}>
                        <Text style={styles.text}>{textOne}</Text>
                        <Ionicons
                            name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle'}
                            size={80}
                            color={pink} />
                    </TouchableOpacity>
                </View>

                <View >
                    {
                        !hideButtonTwo &&
                        <TouchableOpacity style={styles.button}
                            onPress={onPressTwo}>
                            <Text style={styles.text}>{textTwo}</Text>

                            <EvilIcons
                                name='question'
                                size={100}
                                color={pink} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        margin: 15,
    },
    text: {
        color: darkGray,
        fontSize: 18,
        marginBottom: 5,
    }
})

export default ThumbButtons