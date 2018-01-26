import React from 'react'
import { Text } from 'react-native'

const CardCount = ({ style, cards }) => {
    const cardsLength = cards && cards.length
    return (
        <Text style={style || {}}>
            {`${cardsLength} Card${(cardsLength > 1 || cardsLength === 0) && 's'}`}
        </Text>
    )
}

export default CardCount