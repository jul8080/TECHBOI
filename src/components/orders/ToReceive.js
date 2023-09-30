import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";

export default function ToReceive() {
    return (
        <View style={{ backgroundColor: 'green', width: deviceWidth }}>
            <Text>To Receive</Text>
        </View>
    )
}