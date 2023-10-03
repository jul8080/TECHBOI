import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Image, FlatList, ImageBackground, ActivityIndicator, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';

// imported utils here... 
import { deviceWidth } from '../utils/Dimensions'
import { filterFunction } from "../utils/FilterFunction";
import { images } from "../utils/ImageBackground";
import { categories } from "../utils/Products"
import AllProducts from "../components/categories/AllProducts";

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DashboardScreen = () => {
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[1])[0]
    const shopLogoBackground = useState(false)[0]
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState(true)
    // categories here...
    const processors = filterFunction(products, 'processor');
    const motherboards = filterFunction(products, 'motherboard');
    const graphicCards = filterFunction(products, 'gpu');
    const laptops = filterFunction(products, 'laptop');
    const monitors = filterFunction(products, 'monitor');
    const coolers = filterFunction(products, 'cooler');
    const storageDevices = filterFunction(products, 'storage');
    const powerSupplies = filterFunction(products, 'psu');
    const cases = filterFunction(products, 'case');
    const fullSets = filterFunction(products, 'package');
    const headphones = filterFunction(products, 'headphone');

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

    const productImages = {
        image_1: require('../../assets/images/products/trends/trend01.png'),
        image_2: require('../../assets/images/products/trends/trend02.png'),
        image_3: require('../../assets/images/products/trends/trend03.png'),
    }
    const trendProducts = [
        { id: 1, name: 'MOBILE PHONE', desc: 'Available Soon', image: productImages["image_1"] },
        { id: 2, name: 'MORE SALES', desc: 'is coming ', image: productImages["image_2"] },
        { id: 3, name: 'CHRISTMAS', desc: 'is coming ', image: productImages["image_3"] },
        { id: 4, name: 'MOBILE PHONE', desc: 'Available Soon', image: productImages["image_1"] },
        { id: 6, name: 'MORE SALES', desc: 'is coming ', image: productImages["image_2"] },
    ]


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
        { id: 1, images: [{ src: require('../../assets/images/products/trends/trend01.png') }, { src: require('../../assets/images/products/trends/trend02.png') }, { src: require('../../assets/images/products/trends/trend03.png') }] },
        { id: 2, images: [{ src: require('../../assets/images/products/trends/trend03.png') }, { src: require('../../assets/images/products/trends/trend02.png') }, { src: require('../../assets/images/products/trends/trend01.png') }] },
    ]
    const scrollToIndex = (findIndex) => {
        scrollX.current.scrollToIndex({
            index: findIndex,
            animated: true
        })
    }
    useEffect(() => {
        scrollUpdate.current.scrollToIndex({
            index,
            animated: true,
            viewPosition: .1
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
                <View style={{ backgroundColor: 'coral', width: deviceWidth - 35, height: 74, marginBottom: 12, alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>

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
            <View style={{ flex: 1, backgroundColor: 'coral' }}>
                <FlatList
                    onScroll={e => {
                        const x = e.nativeEvent.contentOffset.x
                        setIndex((x / deviceWidth).toFixed(0))
                    }}
                    ref={scrollX}
                    initialScrollIndex={index}
                    scrollEventThrottle={16}
                    pagingEnabled
                    horizontal
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        switch (index) {
                            case 0:
                                return <AllProducts item={item} />
                                break;
                            case 1:
                                return (
                                    <View style={{ width: deviceWidth }}>
                                        <View style={{ width: deviceWidth, backgroundColor: 'green' }}>
                                            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 13, color: '#7F7F7F' }}>{item.name}</Text>
                                        </View>
                                    </View>
                                )
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
            <StatusBar style={statusStyle} backgroundColor="#222222" hidden={shopLogoBackground} />
        </View >
    )
}

export default DashboardScreen