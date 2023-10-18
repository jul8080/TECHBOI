import React, { useState, memo } from "react";
import { View, Text, Pressable, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { deviceWidth } from '../../../utils/Dimensions'
import PaymentMethod from "../PaymentMethod";
import { useContextApi, useStatusBar } from "../../../Helper/Index";
import DeliveryAddress from "./DeliveryAddress";
import ModalBody from "./ModalBody";
import AddressDefault from "../../address/AddressDefault";
import Cards from "../../payment/Cards";


function PaymentConfirmation() {
    const { selectedAddress, showPaymentConfirmation, setShowPaymentConfirmation, select, setSelect } = useContextApi()
    const { statusStyle, shopLogoBackground, onViewCallBack, viewConfigRef } = useStatusBar
    const [visible, setVisible] = useState(false)
    const showModal = () => setVisible(true)

    const hideModal = () => {
        setVisible(false)
    }
    const cancelModal = () => {
        setShowPaymentConfirmation(false)
        setSelect("")
    }



    const cards = [
        { id: 1, desc: 'Cash On Delivery', category: 'COD', image: '' },
        { id: 2, desc: '**** **** **** 5678', category: 'GCash', image: require('../../../../assets/images/cards/gcash.png') },
        { id: 3, desc: '**** **** **** 9101', category: 'Maya', image: require('../../../../assets/images/cards/maya.png') },
    ]
    // const selectedAddress = stateAddress.address.filter(status => status.completed === true)
    return (
        <ModalBody visible={showPaymentConfirmation} animationType="slide" onRequestClose={() => setShowPaymentConfirmation(false)}>
            <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>

                {/* modal starts here... */}
                <DeliveryAddress visible={visible} hideModal={hideModal} />
                {/* modal ends here... */}

                <View style={{ height: 69, width: deviceWidth, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, color: '#000', marginBottom: 5 }}>Payment Confirmation</Text>
                </View>
                {/* Shipping address starts here... */}
                <View style={{ backgroundColor: '#fff', paddingLeft: 10, paddingRight: 15, marginTop: 1, paddingVertical: 5 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Shipping address</Text>

                        <Pressable
                            onPress={showModal}
                            style={{ marginLeft: 'auto' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Change</Text>
                        </Pressable>
                        {selectedAddress.length <= 0 && <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#d5d5d5' }}>Add address</Text>}
                        <FlatList
                            onViewableItemsChanged={onViewCallBack}
                            viewabilityConfig={viewConfigRef}
                            removeClippedSubviews={true}
                            initialNumToRender={4}
                            estimatedItemSize={200}
                            data={selectedAddress}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={_renderAddress}
                        />

                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', paddingLeft: 10, paddingRight: 15, marginTop: 1, paddingTop: 10, paddingBottom: 28 }}>
                    <View>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Payment Method</Text>
                        <Pressable style={{ marginLeft: 'auto' }}><Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Change</Text></Pressable>
                        <View style={{ rowGap: 10 }}>
                            <FlatList
                                onViewableItemsChanged={onViewCallBack}
                                viewabilityConfig={viewConfigRef}
                                removeClippedSubviews={true}
                                initialNumToRender={4}
                                estimatedItemSize={200}
                                data={cards}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={_renderCards}
                            />

                        </View>
                    </View>
                </View>
                {/* Shipping address ends here... */}

                {/* Payment Details starts here... */}
                <PaymentMethod value={0} marginTop={1} />
                {/* Payment Details ends here... */}

                <View style={{ width: deviceWidth, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 33, paddingTop: 10 }}>
                    <TouchableOpacity activeOpacity={.8} onPress={cancelModal} disabled={false} style={{ backgroundColor: '#FE3D3D', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8, }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    {select ? (
                        <TouchableOpacity activeOpacity={.8} onPress={() => alert(123)} style={{ backgroundColor: '#000000', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: '#fff' }}>Confirm</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity activeOpacity={.8} onPress={() => alert(123)} disabled={true} style={{ backgroundColor: !select && '#D5D5D5', width: 115, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 11, color: !select && '#f1f1f1' }}>Confirm</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </ModalBody>
    )

}
const _renderAddress = ({ item: person }) => <AddressDefault person={person} />
const _renderCards = ({ item: card }) => <Cards card={card} />
export default memo(PaymentConfirmation)