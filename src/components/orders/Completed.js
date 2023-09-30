import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";

export default function Completed() {
    return (
        <View style={{ backgroundColor: 'coral', width: deviceWidth }}>
            <Text>Completed</Text>
        </View>
    )
}