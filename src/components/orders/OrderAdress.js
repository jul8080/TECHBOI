import React from 'react'
import { View, Text } from 'react-native'
import { deviceWidth } from '../../utils/Dimensions'

export default function OrderAdress({ header, body }) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent', width: deviceWidth - 50, height: 42, justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#9B9B9B', flex: 1 }}>{header}</Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#222222', flexShrink: 1, flex: 1 }}>{body}</Text>
        </View>
    )
}