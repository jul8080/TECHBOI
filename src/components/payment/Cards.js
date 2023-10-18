import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useContextApi } from "../../Helper/Index";

function Cards({ card }) {
    const { select, setSelect } = useContextApi()
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 75, paddingLeft: 16, margin: 5 }}>
            {card.image !== '' ? <Image source={card.image} /> : <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#000000' }}>COD</Text>}
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: card.category === 'COD' ? '#8BC34A' : '#222222' }}>{card.desc}</Text>
            <TouchableOpacity onPress={() => setSelect(card.category)}>
                <View style={{ borderWidth: 1, borderColor: '#7F7F7F', height: 14, width: 14, borderRadius: 100 / 2, alignItems: 'center', justifyContent: 'center' }}>
                    {select === card.category && <View style={{ backgroundColor: '#7F7F7F', width: 14, height: 14, borderRadius: 100 / 2 }} />}
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default Cards
