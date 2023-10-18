import React, { memo } from "react";
import { View, Text } from "react-native";

function AddressDefault({ person }) {
    return (
        <View>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>{person.name}</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#222222' }}>Phone Number <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#425466' }}>{person.number}</Text></Text>
            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>{person.address}</Text>
        </View>
    )
}

export default memo(AddressDefault)