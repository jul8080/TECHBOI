import React, { useState } from "react";
import { View, Text, Animated, StyleSheet, Pressable, TouchableOpacity, Image, ScrollView } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { deviceWidth } from '../../../utils/Dimensions'
import PaymentMethod from "../PaymentMethod";
import { useStatusBar } from "../../../Helper/Index";
import DeliveryAddress from "./DeliveryAddress";


export default function PaymentConfirmation({ scrollRight, nativeDriver }) {
    const { statusStyle, shopLogoBackground } = useStatusBar
    const [visible, setVisible] = useState(true)
    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false)
    const slideRightHide = () => {
        Animated.timing(scrollRight, {
            toValue: 1000,
            duration: 500,
            useNativeDriver: nativeDriver
        }).start()
        setSelect("")
    }

    const [select, setSelect] = useState("")
    const cards = [
        { id: 1, desc: 'Cash On Delivery', category: 'COD', image: '' },
        { id: 2, desc: '**** **** **** 5678', category: 'GCash', image: require('../../../../assets/images/cards/gcash.png') },
        { id: 3, desc: '**** **** **** 9101', category: 'Maya', image: require('../../../../assets/images/cards/maya.png') },
    ]
    return (
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateX: scrollRight }], flex: 1, backgroundColor: '#f1f1f1', zIndex: 1 }}>
            
            {/* modal starts here... */}
            <DeliveryAddress visible={visible} hideModal={hideModal} />
            {/* modal ends here... */}

            <View style={{ height: 85, width: deviceWidth, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#000', marginBottom: 5 }}>Payment Confirmation</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                {/* Shipping address starts here... */}
                <View style={{ backgroundColor: '#fff', paddingLeft: 10, paddingRight: 15, marginTop: 1, paddingVertical: 5 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Shipping address</Text>
                        <Pressable
                         onPress={showModal}
                         style={{ marginLeft: 'auto' }}><Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Change</Text></Pressable>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>Jul Punding</Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#222222' }}>Phone Number <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#425466' }}>09102345678</Text></Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>Block 4, Marang,</Text>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>Davao City, Philippines</Text>
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', paddingLeft: 10, paddingRight: 15, marginTop: 1, paddingTop: 10, paddingBottom: 28 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Payment Method</Text>
                        <Pressable style={{ marginLeft: 'auto' }}><Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Change</Text></Pressable>
                        <View style={{ rowGap: 10 }}>
                            {cards.map((card, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 75, paddingLeft: 16 }}>
                                    {card.image !== '' ? <Image source={card.image} /> : <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#000000' }}>COD</Text>}
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: card.category === 'COD' ? '#8BC34A' : '#222222' }}>{card.desc}</Text>
                                    <TouchableOpacity onPress={() => setSelect(card.category)}>
                                        <View style={{ borderWidth: 1, borderColor: '#7F7F7F', height: 14, width: 14, borderRadius: 100 / 2, alignItems: 'center', justifyContent: 'center' }}>
                                            {select === card.category && <View style={{ backgroundColor: '#7F7F7F', width: 14, height: 14, borderRadius: 100 / 2 }} />}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
                {/* Shipping address ends here... */}

                {/* Payment Details starts here... */}
                <PaymentMethod value={0} marginTop={1} select={select} />
                {/* Payment Details ends here... */}

                <View style={{ width: deviceWidth, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 33, paddingTop: 10 }}>
                    <Pressable onPress={slideRightHide} disabled={false} style={{ backgroundColor: '#FE3D3D', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8, }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: '#fff' }}>Cancel</Text>
                    </Pressable>
                    {select ? (
                        <Pressable onPress={() => alert(123)} style={{ backgroundColor: '#000000', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: '#fff' }}>Confirm</Text>
                        </Pressable>
                    ) : (
                        <Pressable onPress={() => alert(123)} disabled={true} style={{ backgroundColor: !select && '#D5D5D5', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: !select && '#f1f1f1' }}>Confirm</Text>
                        </Pressable>
                    )}
                </View>
                {/* tabBar starts here... */}
            </ScrollView>
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </Animated.View>
    )

}