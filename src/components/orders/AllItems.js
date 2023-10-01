import React, { useEffect, useState, useRef } from "react";
import { View, Text, } from "react-native";
import { deviceWidth, deviceHeight } from "../../utils/Dimensions";



export default function AllItems() {


    return (
        <View style={{ flex: 1, width: deviceWidth, height: 72, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: '#9B9B9B' }}>You May Also Like</Text>
        </View>
    )
}