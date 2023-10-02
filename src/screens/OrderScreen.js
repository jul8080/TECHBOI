import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Pressable, ScrollView, FlatList, Animated, StyleSheet, ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
// imported utils here...
import { status } from '../utils/ArrayObjects';
import { deviceWidth } from "../utils/Dimensions";
import { getImage } from "../utils/ProductImage";
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
    const scrollX = useRef(0)
    const [scrollIndex, setScrollIndex] = useState(0)


    const scrollToIndex = (index) => {
        scrollX.current.scrollToIndex({
            index,
            animated: true,
        })
    }

    // const animatedScrollX = useRef(new Animated.Value(scrollIndex)).current
    // console.log(animatedScrollX)

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const controller = new AbortController()
    async function getApi() {
        await fetch('http://192.168.0.25:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
                console.log('Done fetching...')
            })
    }

    useEffect(() => {
        getApi()
        return () => {
            controller.abort()
        }
    }, [])


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
                <View>
                    <FlatList
                        onScroll={(e) => { setScrollIndex((e.nativeEvent.contentOffset.x / deviceWidth).toFixed(0)) }}
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
                    />
                </View>
                <View style={{ ...StyleSheet.absoluteFillObject, flex: 1, zIndex: -1 }}>
                    <View style={{ backgroundColor: '#f1f1f1', marginTop: 72 }}>
                        {loading ?
                            (

                                <View style={{ flex: 1, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 14 }}>
                                    <ActivityIndicator size={30} style={{ marginTop: 50 }} />
                                </View>

                            ) :
                            (
                                <View>
                                    {scrollIndex != 0 && (
                                        <View style={{position: 'relative', height: 50, width: deviceWidth - 35, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                            <View style={{ backgroundColor: '#f1f1f1', paddingHorizontal: 10 }}>
                                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: '#9B9B9B' }}>You May Also Like</Text>
                                            </View>
                                            <View style={{ width: '100%', height: 2, backgroundColor: '#fff', position: 'absolute', zIndex: -1 }} />
                                        </View>
                                    )}
                                    <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                                        <View style={{ paddingTop: 10, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, flexDirection: 'row', gap: 15, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 14, marginBottom: 45 }}>
                                            {products.map((item, index) => (
                                                <Pressable
                                                    key={index}
                                                    onPress={() => navigation.navigate('SelectedItems', item)}
                                                    style={{ backgroundColor: '#fff', width: deviceWidth / 2 - 19, height: 284, borderRadius: 15, alignItems: 'stretch', paddingVertical: 20, paddingHorizontal: 10, marginTop: 12 }}
                                                >
                                                    <View style={{ backgroundColor: '#fff', flexGrow: 1, alignItems: 'center', justifyContent: 'cover', borderRadius: 15 }}>
                                                        <Image source={getImage(item.image)} style={{ flex: 1, width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 15 }} />
                                                    </View>
                                                    <View style={{ backgroundColor: '#fff', height: 116 }}>
                                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, marginTop: 5 }}>{item.name}</Text>
                                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, color: '#FF2E2E' }}>₱{item.price}</Text>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <View style={{ flexDirection: 'row', marginRight: 5, alignItems: 'center', columnGap: 2 }}>
                                                                <FontAwesome name="star" size={10} color="#FBBB00" />
                                                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>4.8</Text>
                                                            </View>
                                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F', marginRight: 5 }}>1,150</Text>
                                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>Sould Out</Text>
                                                        </View>
                                                    </View>
                                                </Pressable>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>

                            )}
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