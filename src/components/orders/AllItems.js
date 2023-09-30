import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { deviceWidth, deviceHeight } from "../../utils/Dimensions";
import { getImage } from "../../utils/ProductImage";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { } from "react-native-gesture-handler";


export default function AllItems() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState(true)
    const controller = new AbortController()
    async function getApi() {
        await fetch('http://192.168.0.25:3000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.log(error))
            .finally(() => {
                setStatus(false)
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
        <View style={{ backgroundColor: '#f1f1f1', flex: 1}}>
            {status ?
                (

                    <View style={{ flex: 1, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'flex-start', alignItems: 'center', paddingLeft: 14 }}>
                        <ActivityIndicator size={30} style={{ marginTop: 50 }} />
                    </View>

                ) :
                (
                    <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                        <View style={{paddingTop: 10, backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, flexDirection: 'row', gap: 15, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 14, marginBottom:45 }}>
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
    )
}