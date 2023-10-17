import React, { } from "react";
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { deviceWidth } from "../../utils/Dimensions";
import HelpOptions from "../helpCenter/HelpOptions";
import { } from "react-native-gesture-handler";
import ModalBody from "../method/modal/ModalBody";
import { useContextApi, useStatusBar } from "../../Helper/Index";
import { StatusBar } from 'expo-status-bar';

export default function HelpCenter() {
    const { showHelpCenter, setShowHelpCenter } = useContextApi()
    const { statusStyle, shopLogoBackground } = useStatusBar()
    return (
        <ModalBody visible={showHelpCenter} animationType="slide" onRequestClose={() => setShowHelpCenter(false)}>
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 66, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => setShowHelpCenter(false)} style={{ position: 'absolute', left: 30, bottom: 6 }} />
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, marginBottom: 6, color: '#000' }}>Help Center</Text>
            </SafeAreaView>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: 9 }}>
                    <View>
                        <View style={{ height: 54, width: deviceWidth, backgroundColor: '#425466', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#FFFFFF' }}>Order Shipping</Text>
                        </View>
                        <View style={{ rowGap: 10, paddingTop: 10, paddingBottom: 25 }}>
                            <HelpOptions description={'Orders'} />
                            <HelpOptions description={'Shipping Options'} />
                            <HelpOptions description={'Ratings & Reviews'} />
                            <HelpOptions description={'Shipping Program'} />
                        </View>
                    </View>
                    <View>
                        <View style={{ height: 54, width: deviceWidth, backgroundColor: '#425466', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#FFFFFF' }}>Returns & Refunds</Text>
                        </View>
                        <View style={{ rowGap: 10, paddingTop: 10, paddingBottom: 25 }}>
                            <HelpOptions description={'Raising requests'} />
                            <HelpOptions description={'Disputes'} />
                            <HelpOptions description={'Resolution'} />
                        </View>
                    </View>
                    <View style={{ marginBottom: 45 }}>
                        <View style={{ height: 54, width: deviceWidth, backgroundColor: '#425466', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 15 }}>
                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#FFFFFF' }}>General</Text>
                        </View>
                        <View style={{ rowGap: 10, paddingTop: 10, paddingBottom: 25 }}>
                            <HelpOptions description={'Policies'} />
                            <HelpOptions description={'Techboi Account'} />
                            <HelpOptions description={'Guidelines'} />
                            <HelpOptions description={'Techboi App (Android/iOS)'} />
                            <HelpOptions description={'Resources'} />
                            <HelpOptions description={'Additional Services'} />
                            <HelpOptions description={'Buying Safely'} />
                            <HelpOptions description={'Techboi Desktop'} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </ModalBody>
    )
}