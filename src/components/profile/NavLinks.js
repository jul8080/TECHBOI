import React from "react";
import { View, Text, Pressable } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { deviceWidth } from "../../utils/Dimensions";

export default function NavLinks(props) {
    return (
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', height: 72 }} onPress={props.onPress} >
            <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#000' }}>{props.header}</Text>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#9B9B9B' }}>{props.description}</Text>
            </View>
            <SimpleLineIcons name="arrow-right" size={12} color="#9B9B9B" style={{ marginRight: 8 }} />
        </Pressable>
    )
}