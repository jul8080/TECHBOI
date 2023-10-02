import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Image, ScrollView, Pressable, Animated, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';

// imported utils here... 
import { deviceWidth } from '../utils/Dimensions'
import { filterFunction } from "../utils/FilterFunction";
import { images } from "../utils/ImageBackground";
import { categories } from "../utils/Products"
import ItemWrapper from "../components/categories/wrapper/ItemWrapper";

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DashboardScreen = () => {
    const scrollRef = useRef(null)
    const [current, setCurrent] = useState(0)
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[1])[0]
    const shopLogoBackground = useState(false)[0]
    const animation = useState(new Animated.Value(0))[0]
    const [products, setProducts] = useState([])
    const [ status, setStatus ] = useState(true)
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



    const headerTranslateY = animation.interpolate({
        inputRange: [0, 200],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp'
    })
    const headerOpacity = animation.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })
    const headerScrollY = animation.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -10],
        extrapolate: 'clamp'
    })
    const backwardArrow = () => {
        if (current === 0) {
            return
        }
        setCurrent(current - 1)
        scrollRef.current.scrollToIndex({
            animated: true,
            index: parseInt(current) - 1,
            viewPosition: 0
        })
    }
    const forwardArrow = () => {
        if (current === trendProducts.length - 1) {
            return
        }
        setCurrent(current + 1)
        scrollRef.current.scrollToIndex({
            animated: true,
            index: parseInt(current) + 1,
            viewPosition: 1
        })
    }
    const [ imageBackground, setImageBackground ] = useState(0)
    useEffect(() => {
        const changeImage = setInterval(() => {
            setImageBackground((prevImage) => (prevImage + 1) % images.length)
        }, 5000)

        return () => clearInterval(changeImage)
    }, [])
    return (

        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* header starts here... */}
            <View style={{ }}>
                <ImageBackground 
                    imageStyle={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15,}} 
                    source={images[imageBackground].source} 
                    style={{ height: 304, width: deviceWidth, resizeMode: 'cover' }}
                >
                    
                </ImageBackground>
            </View>
            {/* header ends here... */}
            
          
            {/* products ends here... */}
            <StatusBar style={statusStyle} backgroundColor="#222222" hidden={shopLogoBackground} />
        </View >
    )
}

export default DashboardScreen