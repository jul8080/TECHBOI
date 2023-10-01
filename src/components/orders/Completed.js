import React from "react";
import { View, Text } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ToShip() {
    return (
        <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, height: 72 }}>
            <View style={{ height: '100%', width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#d5d5d5', width: 30, height: 30, borderRadius: 100 / 2, alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="clipboard-text-clock-outline" size={20} color="black" />
                </View>
                <Text style={{ color: '#9B9B9B' }}>No Completed Yet</Text>
            </View>
        </View>
    )
}