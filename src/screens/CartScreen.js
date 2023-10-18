import React, { } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deviceWidth } from '../utils/Dimensions'
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import PaymentMethod from "../components/method/PaymentMethod";
import PaymentConfirmation from "../components/method/modal/PaymentConfirmation";
import { useStatusBar, useContextApi } from "../Helper/Index";
import CartItems from "../components/cart/CartItems";

const CartScreen = ({ navigation }) => {
    const { statusStyle, shopLogoBackground, onViewCallBack, viewConfigRef } = useStatusBar()
    const { state, setShowPaymentConfirmation } = useContextApi()


    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* modal starts here... */}
            <PaymentConfirmation />
            {/* modal ends here... */}
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>Shipping Cart</Text>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14 }}>({state.cart.length} Items)</Text>
                </View>
                <Pressable onPress={() => alert('Edit')}>
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
                    <FlatList
                        onViewableItemsChanged={onViewCallBack}
                        viewabilityConfig={viewConfigRef}
                        removeClippedSubviews={true}
                        initialNumToRender={4}
                        estimatedItemSize={200}
                        showsVerticalScrollIndicator={false}
                        data={state.cart}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <CartItems item={item} />}
                    />
                </View>
            )}

            {/* cart items ends here... */}

            {/* Payment Details starts here... */}
            <PaymentMethod value={35} marginTop={8} />
            {/* Payment Details ends here... */}

            {/* Checkout button starts here... */}
            <View style={{ height: 158, width: deviceWidth - 35, marginBottom: 0, alignSelf: 'center' }}>
                <TouchableOpacity
                    activeOpacity={.7}
                    // onPress={slideRight}
                    onPress={() => setShowPaymentConfirmation(true)}
                    style={{ backgroundColor: '#425466', height: 38, width: 98, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', marginTop: 43 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#fff' }} >Checkout</Text>
                </TouchableOpacity>
            </View>
            {/* Checkout button ends here... */}

            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </View>
    )
}

export default CartScreen