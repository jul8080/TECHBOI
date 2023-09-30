import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";

export default function ReturnRefund() {
    return (
        <View style={{ backgroundColor: 'purple', width: deviceWidth }}>
            <Text>Return Refund</Text>
        </View>
    )
}