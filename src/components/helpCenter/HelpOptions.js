import React, {  } from "react";
import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default function HelpOptions(props) {
    const { description } = props
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 35.5 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: '#222222' }}>{description}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#9B9B9B" />
        </View>
    )
}