import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { deviceWidth } from '../../utils/Dimensions'
import { getImage } from '../../utils/ProductImage'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function AllProductsComp(props) {
    const { item } = props
    const navigation = useNavigation()
    return (
        <Pressable
            onPress={() => navigation.navigate('SelectedItems', item)}
            style={{ backgroundColor: '#fff', width: deviceWidth / 2 - 19, height: 284, borderRadius: 15, alignItems: 'stretch', paddingVertical: 20, paddingHorizontal: 10, marginTop: 12 }}
        >
            <View style={{ backgroundColor: '#fff', flexGrow: 1, alignItems: 'center', justifyContent: 'cover', borderRadius: 15 }}>
                <Image source={getImage(item.image)} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 15 }} />
            </View>
            <View style={{ backgroundColor: '#fff', height: 116 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, marginTop: 5 }}>{item.name}</Text>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, color: '#FF2E2E' }}>₱{item.price}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', marginRight: 5, alignItems: 'center', columnGap: 2 }}>
                        <FontAwesome name="star" size={10} color="#FBBB00" />
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>4.8</Text>
                    </View>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F', marginRight: 5 }}>1,150</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>Sould Out</Text>
                </View>
            </View>
        </Pressable>
    )
}