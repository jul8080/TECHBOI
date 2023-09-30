import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView, FlatList, Animated, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { deviceWidth } from "../utils/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { status } from '../utils/ArrayObjects';
// imported order components here...
import AllItems from "../components/orders/AllItems";
import ToShip from "../components/orders/ToShip";
import ToReceive from "../components/orders/ToReceive";
import Completed from "../components/orders/Completed";
import ReturnRefund from "../components/orders/ReturnRefund";

const OrderScreen = () => {
    const navigation = useNavigation()
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[0])[0]
    const shopLogoBackground = useState(false)[0]
    animatedScrollX
    const scrollX = useRef(0)
    const [scrollIndex, setScrollIndex] = useState(0)


    const scrollToIndex = (index) => {
        scrollX.current.scrollToIndex({
            index,
            animatiom: true
        })
    }

    const animatedScrollX = new Animated.Value(0)

    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Tracking your Parcel</Text>
                </View>
                <Pressable onPress={() => alert('navigate to Transit')}>
                    <MaterialCommunityIcons name="truck-outline" size={22} color="#FF2E2E" />
                </Pressable>
            </SafeAreaView>
            <View style={{ backgroundColor: 'green', flexDirection: 'row', width: deviceWidth, columnGap: 10, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, paddingHorizontal: 34, marginTop: 16 }}>

                {status.map((nav, index) => (
                    <Pressable key={index} style={{}} onPress={() => scrollToIndex(index)}>
                        <Animated.Text style={{ fontFamily: scrollIndex == index ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: 10, color: '#000' }}>{nav.name}</Animated.Text>
                    </Pressable>
                ))}
            </View>
            <View style={{flex: 1, backgroundColor: 'yellow' }}>
                <View>
                    <FlatList
                        onScroll={e => {
                            setScrollIndex((e.nativeEvent.contentOffset.x / deviceWidth).toFixed(0))
                        }}
                        ref={scrollX}
                        initialScrollIndex={scrollIndex}
                        showsVerticalScrollIndicator={false}
                        horizontal
                        pagingEnabled
                        data={status}
                        renderItem={({ item, index }) => {
                            switch (index) {
                                case 0:
                                    return (
                                        <View style={{ flex: 1, width: deviceWidth, height: 72 }}></View>
                                    )
                                    break;
                                case 1:
                                    return (
                                        <View style={{ backgroundColor: 'purple', width: deviceWidth, height: 72 }}>
                                            <Text style={{}}>No Orders Yet</Text>
                                        </View>
                                    )
                                    break;
                                case 2:
                                    return (
                                        <View style={{ backgroundColor: 'orange', width: deviceWidth, height: 72 }}></View>
                                    )
                                    break;
                                case 3:
                                    return (
                                        <View style={{ backgroundColor: 'indigo', width: deviceWidth, height: 72 }}></View>
                                    )
                                    break;
                                case 4:
                                    return (
                                        <View style={{ backgroundColor: 'pink', width: deviceWidth, height: 72 }}></View>
                                    )
                                    break;
                                default:
                                    return null
                                    break;
                            }
                        }}
                    />
                </View>
                <View style={{ ...StyleSheet.absoluteFillObject, flex: 1, backgroundColor: 'red', zIndex: -1 }}>
                    <View style={{ backgroundColor: 'gray', marginTop: 72  }}>
                        <Text>Items here...</Text>
                    </View>
                </View>
            </View>

            {/* <FlatList
                onScroll={e => {
                    setScrollIndex((e.nativeEvent.contentOffset.x/ deviceWidth).toFixed(0))
                }}
                ref={scrollX}
                initialScrollIndex={scrollIndex}
                showsVerticalScrollIndicator={false}
                horizontal
                pagingEnabled
                data={status}
                renderItem={({ item, index }) => {
                    switch (index) {
                        case 0:
                            return <AllItems />
                            break;
                        case 1:
                            return <ToShip />
                            break;
                        case 2:
                            return <ToReceive />
                            break;
                        case 3:
                            return <Completed />
                            break;
                        case 4:
                            return <ReturnRefund />
                            break;
                        default:
                            return null
                            break;
                    }
                }}
            /> */}
            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
        </View>
    )
}

export default OrderScreen