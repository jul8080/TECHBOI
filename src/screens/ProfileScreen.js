import React, { } from "react";
import { View, Text, Image } from "react-native";
import { deviceWidth } from "../utils/Dimensions";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import NavLinks from "../components/profile/NavLinks";
import HelpCenter from "../components/navbar/HelpCenter";
import { useContextApi, useStatusBar } from "../Helper/Index";

const ProfileScreen = () => {
    const { statusStyle, shopLogoBackground } = useStatusBar( )
    const { setShowHelpCenter } = useContextApi()
    const navigation = useNavigation()

 
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* modal starts here... */}
            <HelpCenter  />
            {/* modal ends here... */}
            <SafeAreaView style={{ backgroundColor: '#f1f1f1', width: deviceWidth, height: 86, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 30, bottom: 6 }} />
                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 15, marginBottom: 6, color: '#000' }}>My Profile</Text>
            </SafeAreaView>
            <View style={{ height: 160, width: deviceWidth - 54, backgroundColor: '#f1f1f1', alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                <Image source={require('../../assets/images/profile/profile.jpg')} style={{ height: 56, width: 56, resizeMode: 'cover', borderRadius: 100 / 2 }} />
                <View style={{ paddingLeft: 15 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: '#000' }}>Jul Punding</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>pundingj80@gmail.com</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth - 54, alignSelf: 'center', paddingLeft: 20 }}>
                <NavLinks header="My Orders" description="Already have 12 orders" />
                <NavLinks header="Shipping addresses" description="set up now" />
                <NavLinks header="Promocodes" description="Expired" />
                <NavLinks header="My reviews" description="Make some reviews to your orders now" />
                <NavLinks header="Settings" description="Notifications, password" />
                <NavLinks onPress={() => setShowHelpCenter(true)} header="Help Center" description="Shipping Options, Orders & Shipping" />
            </View>

            {/* tabBar starts here... */}
            <StatusBar style={statusStyle}  hidden={shopLogoBackground} />
        </View>
    )
}

export default ProfileScreen