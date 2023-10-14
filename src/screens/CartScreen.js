import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, Image, FlatList, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deviceWidth } from '../utils/Dimensions'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import PaymentMethod from "../components/method/PaymentMethod";
import PaymentConfirmation from "../components/method/modal/PaymentConfirmation";
import { useStatusBar, useContextApi } from "../Helper/Index";
import { getImage } from "../utils/ProductImage";
import { ACTIONS } from "../Helper/reducer/actions/CartActions";

const CartScreen = ({ navigation }) => {
    const { statusStyle, shopLogoBackground } = useStatusBar()
    const { state, dispatch } = useContextApi()

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
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>({state.cart.length} Items)</Text>
                </View>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13 }}>Edit</Text>
                </Pressable>
            </SafeAreaView>
            {/* cart items starts here... */}
            {state.cart.length <= 0 ? (
                <View style={{ width: deviceWidth, marginTop: 8, alignItems: 'center', paddingVertical: 14, height: 225 }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 14, color: '#777' }}>No items yet.</Text>
                </View>
            ) : (
                <View style={{ backgroundColor: '#fff', width: deviceWidth, height: 225, marginTop: 8, alignItems: 'center', paddingVertical: 14 }}>
                    <ScrollView
                        scrollEventThrottle={16} showsVerticalScrollIndicator={false}
                    >
                        <View style={{ rowGap: 5 }}>
                            {/* items 1 starts here... */}
                            {state.cart.map((item, index) => (
                                <View key={index} style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10 }}>

                                    <View style={{ height: '100%', width: 86 }}>
                                        <Image source={getImage(item.image)} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                    </View>
                                    <View style={{ flex: 1, paddingLeft: 8 }}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>{item.name}</Text>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱{item.price}</Text>
                                            <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                                                <Pressable onPress={() => dispatch({ type: ACTIONS.DECREASE_QTY, payload: item })}>
                                                    <AntDesign name="minus" size={15} color="black" />
                                                </Pressable>
                                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.quantity}</Text>
                                                <Pressable onPress={() => dispatch({ type: ACTIONS.INCREASE_QTY, payload: item.id })}>
                                                    <AntDesign name="plus" size={15} color="black" />
                                                </Pressable>

                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                            {/* items 1 ends here... */}
                        </View>
                    </ScrollView>
                </View>
            )}

            {/* cart items ends here... */}

            {/* Payment Details starts here... */}
            <PaymentMethod value={35} marginTop={8} />
            {/* Payment Details ends here... */}

            {/* Checkout button starts here... */}
            <View style={{ height: 158, width: deviceWidth - 35, marginBottom: 0, alignSelf: 'center' }}>
                <Pressable
                    onPress={slideRight}
                    style={{ backgroundColor: '#425466', height: 38, width: 98, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginTop: 43 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#fff' }} >Checkout</Text>
                </Pressable>
            </View>
            {/* Checkout button ends here... */}

            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </View>
    )
}

export default CartScreen