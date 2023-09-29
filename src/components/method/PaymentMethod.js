import React, { useState } from "react";
import { View, Text } from "react-native";
import { deviceWidth } from "../../utils/Dimensions";

export default function PaymentMethod({value, marginTop, select}) {
    return (
        <View style={{ width: deviceWidth - value, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 20, marginTop: marginTop }} >
            <View style={{ borderBottomWidth: 2, borderStyle: 'dashed', borderColor: '#EDF1F4', paddingBottom: 12 }} >
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: '#454545' }}>PAYMENT DETAILS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>Bag Total</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#000' }}>₱44,800</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>Packaging</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#8BC34A' }}>Free</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>Payment Method</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: select ? '#8BC34A' : '#d5d5d5' }}>{select ? select === 'COD' ? `Cash on Delivery${'(' +select+ ')'}`: select : 'None'}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>Shipping Charges</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#000' }}>Free Shipping</Text>
                </View>
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#A1A1A1' }}>Includes long distance fee of for 16km</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }} >
                <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'uppercase', fontSize: 14, color: '#000' }}>total</Text>
                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#000' }}>₱44,800</Text>
            </View>
            <View style={{ backgroundColor: '#EDF1F4', height: 31, alignItems: 'center', justifyContent: 'center', marginTop: 12 }} >
                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000' }}>You’re saving PHP 1050 on this order!</Text>
            </View>
        </View>
    )
}