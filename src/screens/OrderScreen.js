import React, { useState, useRef, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// imported utils here...
import { status } from '../utils/ArrayObjects';
import { deviceWidth } from "../utils/Dimensions";
// imported order components here...
import AllItems from "../components/orders/AllItems";
import ToShip from "../components/orders/ToShip";
import ToReceive from "../components/orders/ToReceive";
import Completed from "../components/orders/Completed";
import ReturnRefund from "../components/orders/ReturnRefund";
import AllItemText from "../components/orders/AllItemText";
// imported helper here...
import { useContextApi, useStatusBar } from "../Helper/Index";

const OrderScreen = () => {
    const { products, loading } = useContextApi()
    const { statusStyle, shopLogoBackground, onViewCallBack,  viewConfigRef } = useStatusBar()
    const navigation = useNavigation()

    const scrollX = useRef(0)
    const [scrollIndex, setScrollIndex] = useState(0)

    const scrollToIndex = (index) => {

        scrollX.current.scrollToIndex({
            index,
            animated: true,
        })
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', columnGap: 5 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Tracking your Parcel</Text>
                </View>
                <Pressable onPress={() => navigation.push('Transit')}>
                    <MaterialCommunityIcons name="truck-outline" size={22} color="#FF2E2E" />
                </Pressable>
            </SafeAreaView>
            <View style={{ flexDirection: 'row', width: deviceWidth, columnGap: 10, alignItems: 'center', justifyContent: 'center', paddingBottom: 10, paddingHorizontal: 34, marginTop: 16 }}>

                {status.map((nav, index) => (
                    <Pressable key={index} style={{}} onPress={() => scrollToIndex(index)}>
                        <Text style={{ fontFamily: scrollIndex == index ? 'Poppins-Bold' : 'Poppins-Regular', fontSize: 10, color: '#000' }}>{nav.name}</Text>
                    </Pressable>
                ))}
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'transparent' }}>
                    <FlatList
                        scrollEnabled={false}
                        onScroll={(e) => { setScrollIndex((e.nativeEvent.contentOffset.x / deviceWidth).toFixed(0)) }}
                        ref={scrollX}
                        initialScrollIndex={scrollIndex}
                        showsVerticalScrollIndicator={false}
                        horizontal
                        pagingEnabled
                        data={status}
                        renderItem={({ index }) => {
                            switch (index) {
                                case 0:
                                    return <AllItemText />
                                    break;
                                case 1:
                                    return <ToShip scrollIndex={scrollIndex} />
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
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#f1f1f1' }}>
                        {loading ?
                            (

                                <View style={{ flex: 1, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 14 }}>
                                    <ActivityIndicator size={30} style={{ marginTop: 50 }} />
                                </View>

                            ) :
                            (
                                <View style={{}}>
                                    {scrollIndex != 0 && (
                                        <View style={{ position: 'relative', height: 50, width: deviceWidth - 35, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                            <View style={{ backgroundColor: '#f1f1f1', paddingHorizontal: 10 }}>
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: '#9B9B9B' }}>You May Also Like</Text>
                                            </View>
                                            <View style={{ width: '100%', height: 1, backgroundColor: '#d5d5d5', position: 'absolute', zIndex: -1 }} />
                                        </View>
                                    )}
                                    <View style={{ paddingTop: 10, backgroundColor: '#f1f1f1', width: deviceWidth, marginBottom: 45, alignItems: 'center' }}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            onViewableItemsChanged={onViewCallBack}
                                            viewabilityConfig={viewConfigRef}
                                            initialNumToRender={4}
                                            estimatedItemSize={200}
                                            removeClippedSubviews={true}
                                            data={products}
                                            numColumns={2}
                                            keyExtractor={(_, index) => index.toString()}
                                            renderItem={_renderItem}
                                        />
                                    </View>
                                </View>

                            )}
                    </View>
                </View>
            </View>


            {/* tabBar starts here... */}
            <StatusBar style={statusStyle} hidden={shopLogoBackground} />
        </View>
    )
}
const _renderItem = ({item}) => <AllItems item={item} />
export default OrderScreen