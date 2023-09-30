import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ToShip() {
    return (
        <View style={{ backgroundColor: 'coral', width: deviceWidth }}>
            <View style={{ alignItems: 'center',marginTop: 20 }}>
                <MaterialCommunityIcons name="clipboard-text-clock-outline" size={24} color="black" />
                <Text>No Orders Yet</Text>
            </View>
        </View>
    )
}