import React, { useState } from "react";
import { View, Text, Pressable, Image, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deviceWidth } from '../utils/Dimensions'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from "react-native-gesture-handler";
import PaymentMethod from "../components/method/PaymentMethod";
import PaymentConfirmation from "../components/method/modal/PaymentConfirmation";

const CartScreen = ({ navigation }) => {
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[0])[0]
    const shopLogoBackground = useState(false)[0]

    const scrollRight = useState(new Animated.Value(1000))[0] //setting to 1000 so that the modal will be hided to the right side of screentrue.
    const nativeDriver = useState(true)[0]
    const slideRight = () => {
        Animated.timing(scrollRight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: nativeDriver
        }).start()
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* modal starts here... */}
            <PaymentConfirmation nativeDriver={nativeDriver} scrollRight={scrollRight} />
            {/* modal ends here... */}
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Shipping Cart</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>(3 Items)</Text>
                </View>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}>Edit</Text>
                </Pressable>
            </SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
                {/* cart items starts here... */}
                <View style={{ backgroundColor: '#fff', width: deviceWidth, height: 410, marginTop: 8, alignItems: 'center', paddingVertical: 14 }}>
                    <ScrollView
                        scrollEventThrottle={16} showsVerticalScrollIndicator={false}
                    >
                        <View style={{ rowGap: 5 }}>
                            {/* items 1 starts here... */}
                            <View style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10 }}>

                                <View style={{ height: '100%', width: 86 }}>
                                    <Image source={require('../../assets/images/products/items/headphone08.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                                <View style={{ flex: 1, paddingLeft: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>COOLERMASTER CH331 GAMING HEADSET | RGB LOGO | 50MM DRIVERS | PU EAR CUSHION | USB CONNECTION</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱2,250</Text>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                                            <Pressable>
                                                <AntDesign name="minus" size={15} color="black" />
                                            </Pressable>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>3</Text>
                                            <Pressable>
                                                <AntDesign name="plus" size={15} color="black" />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* items 1 ends here... */}
                            {/* items 2 starts here... */}
                            <View style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10 }}>

                                <View style={{ height: '100%', width: 86 }}>
                                    <Image source={require('../../assets/images/products/items/headphone08.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                                <View style={{ flex: 1, paddingLeft: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>COOLERMASTER CH331 GAMING HEADSET | RGB LOGO | 50MM DRIVERS | PU EAR CUSHION | USB CONNECTION</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱2,250</Text>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                                            <Pressable>
                                                <AntDesign name="minus" size={15} color="black" />
                                            </Pressable>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>3</Text>
                                            <Pressable>
                                                <AntDesign name="plus" size={15} color="black" />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* items 2 ends here... */}
                            {/* items 3 starts here... */}
                            <View style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10 }}>

                                <View style={{ height: '100%', width: 86 }}>
                                    <Image source={require('../../assets/images/products/items/headphone08.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                                <View style={{ flex: 1, paddingLeft: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>COOLERMASTER CH331 GAMING HEADSET | RGB LOGO | 50MM DRIVERS | PU EAR CUSHION | USB CONNECTION</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱2,250</Text>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                                            <Pressable>
                                                <AntDesign name="minus" size={15} color="black" />
                                            </Pressable>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>3</Text>
                                            <Pressable>
                                                <AntDesign name="plus" size={15} color="black" />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* items 3 ends here... */}
                            {/* items 4 starts here... */}
                            <View style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10 }}>

                                <View style={{ height: '100%', width: 86 }}>
                                    <Image source={require('../../assets/images/products/items/headphone08.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                </View>
                                <View style={{ flex: 1, paddingLeft: 8 }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>COOLERMASTER CH331 GAMING HEADSET | RGB LOGO | 50MM DRIVERS | PU EAR CUSHION | USB CONNECTION</Text>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱2,250</Text>
                                        <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                                            <Pressable>
                                                <AntDesign name="minus" size={15} color="black" />
                                            </Pressable>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>3</Text>
                                            <Pressable>
                                                <AntDesign name="plus" size={15} color="black" />
                                            </Pressable>

                                        </View>
                                    </View>
                                </View>
                            </View>
                            {/* items 4 ends here... */}
                        </View>
                    </ScrollView>
                </View>
                {/* cart items ends here... */}

                {/* Payment Details starts here... */}
                <PaymentMethod value={35} marginTop={8} />
                {/* Payment Details ends here... */}

                {/* Checkout button starts here... */}
                <View style={{ height: 158, width: deviceWidth - 35, marginBottom: 45, alignSelf: 'center' }}>
                    <Pressable
                        onPress={slideRight}
                        style={{ backgroundColor: '#425466', height: 38, width: 98, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginTop: 43 }}>
                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#fff' }} >Checkout</Text>
                    </Pressable>
                </View>
            {/* Checkout button ends here... */}
            </ScrollView>

            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </View>
    )
}

export default CartScreen