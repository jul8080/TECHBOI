import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Image, FlatList, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { Feather, MaterialIcons } from '@expo/vector-icons';
// imported utils here... 
import { deviceHeight, deviceWidth } from '../utils/Dimensions'
import { images } from "../utils/ImageBackground";
import { categories } from "../utils/Products"
import AllProducts from "../components/categories/AllProducts";
// import helper here...
import { useContextApi, useStatusBar, useCategories } from "../Helper/Index";

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DashboardScreen = () => {
    const { products, loading } = useContextApi()
    const { statusStyle, shopLogoBackground } = useStatusBar()
    const {
        processors,
        motherboards,
        graphicCards,
        laptops,
        monitors,
        coolers,
        storageDevices,
        powerSupplies,
        cases,
        fullSets,
        headphones
    } = useCategories()
    const scrollTo = useRef()

    const [imageBackground, setImageBackground] = useState(0)
    useEffect(() => {
        const changeImage = setInterval(() => {
            setImageBackground((prevImage) => (prevImage + 1) % images.length)
        }, 5000)

        return () => clearInterval(changeImage)
    }, [])
    const scrollX = useRef()
    const scrollUpdate = useRef()
    const [index, setIndex] = useState(0)
    const sales = [
        { id: 1, content: [{name: 'MOBILE PHONE', desc: 'Available Soon'}, {name: 'MORE SALES', desc: 'is coming'}, {name: 'CHRISTMAS', desc: 'is coming'}], images: [{ src: require('../../assets/images/products/trends/trend01.png') }, { src: require('../../assets/images/products/trends/trend02.png') }, { src: require('../../assets/images/products/trends/trend03.png') }] },
        { id: 2, content: [{name: 'MOBILE PHONE', desc: 'Available Soon'}, {name: 'MORE SALES', desc: 'is coming'}, {name: 'CHRISTMAS', desc: 'is coming'}], images: [{ src: require('../../assets/images/products/trends/trend03.png') }, { src: require('../../assets/images/products/trends/trend02.png') }, { src: require('../../assets/images/products/trends/trend01.png') }] },
    ]
    const scrollToIndex = (findIndex) => {
    
        scrollX.current.scrollToIndex({
            index: findIndex,
            animated: true,
        })
    }
    useEffect(() => {
        scrollUpdate.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0,
            viewOffset: 10

        })
    }, [index])
    return (

        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* header starts here... */}
            <ImageBackground
                imageStyle={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15, }}
                source={images[imageBackground].source}
                style={{ width: deviceWidth, resizeMode: 'cover' }}
            >
                {/* header Content & profile image starts here... */}
                <View style={{ flexDirection: 'row', marginTop: 57, width: deviceWidth }}>
                    <View style={{ flex: 1, paddingHorizontal: 35 }}>
                        <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 24, color: '#d8d8d8' }}>Wanna build your own Pc?</Text>
                    </View>
                    <View style={{ paddingRight: 28 }}>
                        <Image source={require('../../assets/images/profile/profile.jpg')} style={{ height: 32, width: 32, resizeMode: 'cover', borderRadius: 100 / 2 }} />
                    </View>
                </View>
                {/* header Content & profile image ends here... */}

                {/* header search input starts here... */}
                <View style={{ alignItems: 'center', marginTop: 21 }}>
                    <View style={{ width: deviceWidth - 35, height: 56, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', borderRadius: 15, paddingLeft: 15 }}>
                        <Feather name="search" size={20} color="grey" />
                        <TextInput placeholder="Search Items: " style={{ height: '100%', flexShrink: 1, flex: 1, marginLeft: 8 }} />
                    </View>
                </View>
                {/* header search input ends here... */}

                {/* trend products start here... */}
                <View style={{ width: deviceWidth - 35, height: 74, marginBottom: 12, alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="keyboard-arrow-left" size={24} color="#7F7F7F" onPress={() => scrollTo.current.scrollTo({ x: 0, animated: true })} />
                    <View style={{ flex: 1, height: '100%' }}>
                        <ScrollView ref={scrollTo} horizontal pagingEnabled >
                            {/* <View style={{ gap: 5 }}> */}

                            {sales.map((item, index) => (
                                <View key={index} style={{ marginRight: index == 0 ? 3 : 0, height: '100%', width: deviceWidth - 84, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ width: deviceWidth / 3 - 30, height: '100%', borderRadius: 5 }}>
                                        <Image source={item.images[0].src} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                                        <View style={{ alignItems: 'center',justifyContent: 'center', rowGap: -3, backgroundColor: '#fff', width: '100%', height: 31, position: 'absolute', bottom: 0, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10 }}>{item.content[0].name}</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 7 }}>{item.content[0].desc}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceWidth / 3 - 30, height: '100%', borderRadius: 5 }}>
                                        <Image source={item.images[1].src} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                                        <View style={{ alignItems: 'center',justifyContent: 'center', rowGap: -3, backgroundColor: '#fff', width: '100%', height: 31, position: 'absolute', bottom: 0, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10 }}>{item.content[1].name}</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 7 }}>{item.content[1].desc}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: deviceWidth / 3 - 30, height: '100%', borderRadius: 5 }}>
                                        <Image source={item.images[2].src} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                                        <View style={{ alignItems: 'center',justifyContent: 'center', rowGap: -3, backgroundColor: '#fff', width: '100%', height: 31, position: 'absolute', bottom: 0, borderRadius: 5 }}>
                                            <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10 }}>{item.content[2].name}</Text>
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 7 }}>{item.content[2].desc}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                            {/* </View> */}

                        </ScrollView>
                    </View>
                    <MaterialIcons name="keyboard-arrow-right" size={24} color="#7F7F7F" onPress={() => scrollTo.current.scrollTo({ x: deviceWidth, animated: true })} />
                </View>
                {/* trend products ends here... */}

            </ImageBackground>
            {/* header ends here... */}

            {/* navbar starts here... */}
            <View style={{ height: 48, width: deviceWidth, alignSelf: 'center', paddingLeft: 24 }}>
                <FlatList
                    ref={scrollUpdate}
                    initialScrollIndex={index}
                    scrollEventThrottle={16}
                    horizontal
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index: findIndex }) => (
                        <TouchableOpacity onPress={() => scrollToIndex(findIndex)} style={{ alignItems: ' center', justifyContent: 'center', marginRight: 19 }}>
                            <Text style={{ fontFamily: findIndex == index ? 'Poppins-Medium' : 'Poppins-Regular', fontSize: findIndex == index ? 14 : 13, color: findIndex == index ? '#000' : '#7F7F7F' }}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {/* navbar ends here... */}

            {/* navbar items starts here... */}
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <FlatList
                    onScroll={e => {
                        const x = e.nativeEvent.contentOffset.x
                        setIndex((x / deviceWidth).toFixed(0))
                    }}
                    ref={scrollX}
                    getItemLayout={(_, index) => (
                        {length: deviceWidth, offset: deviceWidth * index, index}
                    )}
                    estimatedItemSize={200}
                    removeClippedSubviews={true}
                    initialScrollIndex={index}
                    scrollEventThrottle={16}
                    pagingEnabled
                    horizontal
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ index }) => {
                        switch (index) {
                            case 0:
                                return <AllProducts products={products} loading={loading} />
                                break;
                            case 1:
                                return <AllProducts products={processors} loading={loading} />
                                break;
                            case 2:
                                return <AllProducts products={motherboards} loading={loading} />
                                break;
                            case 3:
                                return <AllProducts products={graphicCards} loading={loading} />
                                break;
                            case 4:
                                return <AllProducts products={laptops} loading={loading} />
                                break;
                            case 5:
                                return <AllProducts products={monitors} loading={loading} />
                                break;
                            case 6:
                                return <AllProducts products={coolers} loading={loading} />
                                break;
                            case 7:
                                return <AllProducts products={storageDevices} loading={loading} />
                                break;
                            case 8:
                                return <AllProducts products={processors} loading={loading} />
                                break;
                            case 9:
                                return <AllProducts products={powerSupplies} loading={loading} />
                                break;
                            case 10:
                                return <AllProducts products={cases} loading={loading} />
                                break;
                            case 11:
                                return <AllProducts products={fullSets} loading={loading} />
                                break;
                            case 12:
                                return <AllProducts products={headphones} loading={loading} />
                                break;
                            default:
                                return null
                                break;
                        }
                    }}
                />
            </View>
            {/* navbar items ends here... */}

            {/* products ends here... */}
            <StatusBar style='light' hidden={shopLogoBackground} />
        </View >
    )
}

export default memo(DashboardScreen)