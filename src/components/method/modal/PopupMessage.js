import React, { } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { deviceWidth } from "../../../utils/Dimensions";
import { Ionicons } from '@expo/vector-icons';
import { useContextApi } from "../../../Helper/Index";
import { ACTIONS } from "../../../Helper/reducer/actions/CartActions";


export default function PopupMessage() {
    const {
        editData,
        stateAddress,
        dispatchAddress,
        popupMessage, 
        setPopupMessage,
        fname,
        number,
        address,
        city,
        region,
        zcode,
        country,
        setFname,
        setNumber,
        setAddress,
        setCity,
        setRegion,
        setZcode,
        setCountry,
     } = useContextApi()

    const submitForm = () => {
        if(stateAddress.statusForm) {
            dispatchAddress({ type: ACTIONS.EDIT_ADDRESS, payload: {id: editData, name: fname, number: number, address: address, city: city, region: region, zcode: zcode, country: country } })
        } else {
            dispatchAddress({ type: ACTIONS.ADD_ADDRESS, payload: { name: fname, number: number, address: address, city: city, region: region, zcode: zcode, country: country } })
        }
        setFname('')
        setNumber('')
        setAddress('')
        setCity('')
        setRegion('')
        setZcode('')
        setCountry('')
        setPopupMessage(false)
    }
    return (
        <View style={{ ...StyleSheet.absoluteFillObject, display: popupMessage ? 'block' : 'none', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 1 }}>
            <View style={{ width: deviceWidth - 50, height: 160, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 20 }}>
                <Text style={{ marginLeft: 30 }}>Address Name -{fname}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                    <View style={{ width: 24, height: 24, alignItems: 'center' }}>
                        <Ionicons name="location-sharp" size={24} color="black" />
                        <View style={{ width: '65%', height: 2, backgroundColor: '#000' }} />
                    </View>
                    <Text>{address}</Text>
                </View>
                <TouchableOpacity
                    onPress={submitForm}
                    style={{ alignItems: 'center', justifyContent: 'center', marginTop: 'auto', marginLeft: 'auto', marginBottom: 10, backgroundColor: '#4CD964', width: 105, height: 25, borderRadius: 30 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#fff', textTransform: 'uppercase' }}>ok</Text>
                </TouchableOpacity>
            </View>

        </View >
    )
}