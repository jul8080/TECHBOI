import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { deviceWidth } from "../utils/Dimensions"
import { Ionicons, EvilIcons, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { getImage } from '../utils/ProductImage';
import { filterFunction } from '../utils/FilterFunction'

export default function SelectedItemsScreen({ navigation, route }) {
    const { name, image, price, rating, status, category, id, qty } = route.params
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[0])[0]
    const shopLogoBackground = useState(false)[0]
    const [loading, setLoading] = useState(true)
    const [ product, setProduct ] = useState({
        id,
        name,
        image,
        price,
        category,
        qty,
        rating,
        status: false,

    })
    const [products, setProducts] = useState([])
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

    const item = filterFunction(products, category)
    const addToCart = (product) => {
        console.log(product)
    }
    return (
        <View style={{ flex: 1 }}>


            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
                {/* header starts here... */}
                <View style={{ width: deviceWidth - 35, height: 32, marginTop: 48, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13 }}>
                    <Ionicons name="arrow-back-circle-outline" size={24} color="black" onPress={() => navigation.goBack()} />
                    <View style={{ flexDirection: 'row', flex: 1, height: '100%', backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', jusitifyContent: 'center' }}>
                        <EvilIcons name="search" size={20} color="#BABABA" style={{ marginLeft: 15, marginRight: 8 }} />
                        <TextInput placeholder="Search Items: " style={{ flexShrink: 1, width: '100%', height: '100%', fontFamily: 'Poppins-Regular', color: '#000', fontSize: 12 }} />
                    </View>
                    <View style={{ flexDirection: 'row', columnGap: 15 }}>
                        <MaterialCommunityIcons name="cart-plus" size={24} color="black" />
                        <Entypo name="dots-three-horizontal" size={24} color="black" />
                    </View>
                </View>
                {/* header ends here... */}

                {/* image starts here... */}
                <View style={{ width: deviceWidth, height: 379, backgroundColor: '#fff', marginTop: 20 }}>
                    <Image source={getImage(image)} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                {/* image ends here... */}

                {/* image description starts here... */}
                <View style={{ backgroundColor: '#fff', alignItems: 'center' }}>
                    <View style={{ width: deviceWidth - 20, paddingVertical: 20 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: '#000000' }}>{name}</Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 20, color: '#FF2E2E', marginTop: 5 }}>₱{price}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5, marginTop: 0 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>{rating}</Text>
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>1,150</Text>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>{status ? 'Available' : 'Sold out'}</Text>
                        </View>
                        <View style={{ marginTop: 3, rowGap: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000000', marginRight: 5 }}>Payment Available</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#0ACF83' }}>Cash on Delivery</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#0070FF' }}>-Gcash</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#185F2F' }}>-Maya</Text>
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#185F2F' }}>Refund Policy</Text>
                            <ScrollView horizontal>
                                {item.map((product, index) => (
                                    <Pressable key={index} onPress={() => alert(product.id)} style={{ flexDirection: 'row', marginRight: 28 }}>
                                        <Image source={getImage(product.image)} style={{ height: 82, width: 82, resizeMode: 'cover' }} />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </View>
                {/* image description ends here... */}

                {/* comments starts here... */}
                <View style={{ rowGap: 5, backgroundColor: '#f1f1f1' }}>

                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ paddingHorizontal: 53, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11 }}>See More</Text>
                        </View>
                        <View style={{ paddingHorizontal: 21 }}>
                            <Text>Customer Reviews </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#000', marginTop: 5 }}>4.9/<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#7F7F7F', marginTop: 5 }}>5</Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#fff', width: deviceWidth, flexDirection: 'row', paddingTop: 13 }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 21 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#000' }}>Juan Dela Cruz</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000' }}>Lorem ipsum dolor sit amet consectetur. Id porttitor sem pretium eu orci non semper eget nullam.</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', height: '100%', width: 117, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', columnGap: 28, paddingBottom: 20 }}>
                                <AntDesign name="like2" size={20} color="black" />
                                <AntDesign name="dislike2" size={20} color="black" />
                            </View>
                        </View>

                        <View style={{ width: deviceWidth, backgroundColor: '#fff', alignItems: 'center' }}>
                            <View style={{ width: deviceWidth - 21, height: 82, columnGap: 2, flexDirection: 'row', marginTop: 13, marginBottom: 20 }}>
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ paddingHorizontal: 53, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11 }}>See More</Text>
                        </View>
                        <View style={{ paddingHorizontal: 21 }}>
                            <Text>Customer Reviews </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#000', marginTop: 5 }}>4.9/<Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#7F7F7F', marginTop: 5 }}>5</Text></Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                    <Image source={require('../../assets/images/star/star_filled.png')} style={{ height: 10, width: 10, resizeMode: 'cover' }} />
                                </View>
                            </View>
                        </View>
                        {/* 2nd comment starts here... */}
                        <View style={{ backgroundColor: '#fff', width: deviceWidth, flexDirection: 'row', paddingTop: 13 }}>
                            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 21 }}>
                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 13, color: '#000' }}>Juan Dela Cruz</Text>
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000' }}>Lorem ipsum dolor sit amet consectetur. Id porttitor sem pretium eu orci non semper eget nullam.</Text>
                            </View>
                            <View style={{ backgroundColor: '#fff', height: '100%', width: 117, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', columnGap: 28, paddingBottom: 20 }}>
                                <AntDesign name="like2" size={20} color="black" />
                                <AntDesign name="dislike2" size={20} color="black" />
                            </View>
                        </View>

                        <View style={{ width: deviceWidth, backgroundColor: '#fff', alignItems: 'center' }}>
                            <View style={{ width: deviceWidth - 21, height: 82, columnGap: 2, flexDirection: 'row', marginTop: 13, marginBottom: 20 }}>
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                                <View style={{ flex: 1, width: null, height: null, backgroundColor: '#D9D9D9' }} />
                            </View>
                        </View>
                    </View>
                    {/* 2nd comment ends here... */}

                </View>
                {/* comments ends here... */}
                <StatusBar style={statusStyle} backgroundColor="#fff" hidden={shopLogoBackground} />
            </ScrollView>
            {/* tabBar starts here... */}
            <View style={{ height: 65, width: deviceWidth, backgroundColor: '#fff', flexDirection: 'row', marginTop: 3 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Pressable style={{ flexDirection: 'row',alignItems: 'center' ,justifyContent: 'center', columnGap: 2}}>
                        <MaterialCommunityIcons name="storefront-outline" size={15} color="black" />
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>Visit Shop</Text>
                    </Pressable>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Pressable onPress={() => addToCart(product)} style={{flexDirection: 'row', alignItems: 'center' ,justifyContent: 'center', columnGap: 2 }}>
                        <MaterialCommunityIcons name="cart-outline" size={15} color="black" />
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>Add to Cart</Text>
                    </Pressable>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' ,justifyContent: 'center', columnGap: 2}}>
                    <Pressable style={{ flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="shopping-outline" size={15} color="black" />
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>Buy Now</Text>
                    </Pressable>
                </View>
            </View>
            {/* tabBar ends here...!!! */}
        </View>
    )
}