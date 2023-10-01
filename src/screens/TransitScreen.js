import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ActivityIndicator, Image, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { deviceWidth } from "../utils/Dimensions";
import { getImage } from "../utils/ProductImage";
import HelpCenter from "../components/navbar/HelpCenter";

export default function TransitScreen({ navigation }) {
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

    const scrollRight = useState(new Animated.Value(1000))[0]
    const nativeDriver = useState(true)[0]
    const slideRight = () => {
        Animated.timing(scrollRight, {
            toValue: 0,
            duration: 500,
            useNativeDriver: nativeDriver
        }).start()
    }
    const slideRightHide = () => {
        Animated.timing(scrollRight, {
            toValue: 1000,
            duration: 500,
            useNativeDriver: nativeDriver
        }).start()
    }
 
    return (
        <View style={{ flex: 1 }}>
            {/* modal starts here... */}
            <HelpCenter scrollRight={scrollRight} nativeDriver={nativeDriver} slideRightHide={slideRightHide} />
            {/* modal ends here... */}
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <AntDesign name="arrowleft" size={15} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', rowGap: -5 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Tracking your Parcel</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#7F7F7F' }}>3 Items</Text>
                </View>
                <Pressable onPress={slideRight}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#7F7F7F' }}>Help</Text>
                </Pressable>
            </SafeAreaView>
            {/* Tracking your Parcel starts here... */}
            <View style={{ height: 300, width: deviceWidth, backgroundColor: 'coral', marginTop: 11 }}>
                <View style={{ width: deviceWidth, paddingHorizontal: 30, backgroundColor: 'red', paddingVertical: 5 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Standard shipping through J&T Express</Text>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#000' }}>0123456789</Text>
                </View>
            </View>
            {/* Tracking your Parcel ends here... */}

            {/* All items starts here... */}
            <View style={{  }}>
                <View style={{ paddingHorizontal: 30, height: 60 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15, color: '#000', marginTop: 10 }}>You may also like</Text>
                </View>
                {loading ?
                    (

                        <View style={{ flex: 1, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 14 }}>
                            <ActivityIndicator size={30} style={{ marginTop: 50 }} />
                        </View>

                    ) :
                    (
                        <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                            <View style={{ paddingTop: 0, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, flexDirection: 'row', gap: 15, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 14 }}>
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

                    )}
            </View>
            {/* All items ends here... */}
        </View>
    )
}