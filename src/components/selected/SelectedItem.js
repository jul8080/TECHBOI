import React from "react";
import { View, Text, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { deviceWidth } from "../../utils/Dimensions";
import { getImage } from "../../utils/ProductImage";
export default function SelectedItem(props) {
    const { product, loading } = props
    return (
        <View style={{ backgroundColor: '#fff', width: deviceWidth / 2 - 19, height: 284, borderRadius: 5, alignItems: 'stretch', paddingVertical: 10, paddingHorizontal: 10 }}>
            <Image source={getImage(product.image)} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
            <View style={{ backgroundColor: '#fff', height: 100, alignItems: 'flex-start', paddingHorizontal: 15 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12 }}>COOLERMASTER CH331 GAMING HEADSET ...</Text>
                <View style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#FF2E2E' }}>₱750</Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#FF2E2E' }}>Cash on Delivery</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 3, alignItems: 'center' }}>
                            <Entypo name="star" size={10} color="black" />
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#7F7F7F' }}>4.8</Text>
                        </View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#7F7F7F' }}>1,150 Sold out</Text>
                    </View>
                </View>
            </View>
        </View>

    )
}