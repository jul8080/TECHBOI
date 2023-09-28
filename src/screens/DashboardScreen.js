import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, Image, ScrollView, Pressable, Animated, FlatList, ImageBackground, ActivityIndicator } from "react-native";
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';

// imported utils here... 
import { deviceWidth, deviceHeight } from '../utils/Dimensions'
import { filterFunction } from "../utils/FilterFunction";
import { categories } from "../utils/Products"
import ItemWrapper from "../components/categories/wrapper/ItemWrapper";
import Header from "../components/dashboard/Header";

const HEADER_MAX_HEIGHT = 50;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const DashboardScreen = () => {
    const scrollRef = useRef(null)
    const [current, setCurrent] = useState(0)
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = useState(StatusBarStyle[1])[0]
    const shopLogoBackground = useState(false)[0]
    const [currentIndex, setCurrentIndex] = useState(0)
    const animation = useState(new Animated.Value(0))[0]
    const [products, setProducts] = useState([])
    const [index, setIndex] = useState(0)
    const [scrollIndex, setScrollIndex] = useState(0)
    const [categoriesIndex, setCategoriesIndex] = useState(0)
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

    return (

        <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
            {/* header starts here... */}
            <ImageBackground source={require('../../assets/images/header/bg01.png')} style={{ backgroundColor: '#222222', width: deviceWidth, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center', alignItems: 'center', resizeMode: 'cover' }}>
                <View style={{ width: deviceWidth - 30, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginTop: 57 }}>
                        <Text style={{ color: '#D8D8D8', fontFamily: 'Poppins-Bold', fontSize: 22 }}>Wanna build your</Text>
                        <Text style={{ color: '#D8D8D8', fontFamily: 'Poppins-Bold', fontSize: 22, marginTop: - 5 }}>own PC?</Text>
                    </View>
                    <Image source={require('../../assets/images/profile/profile.jpg')} style={{ width: 32, height: 32, resizeMode: 'cover', borderRadius: 100 / 2, position: 'absolute', right: 0, top: 50 }} />
                </View>
                <View style={{ flexDirection: 'row', width: deviceWidth - 30, height: 56, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', marginTop: 20, jusitifyContent: 'center' }}>
                    <EvilIcons name="search" size={24} color="#BABABA" style={{ marginLeft: 15, marginRight: 8 }} />
                    <TextInput placeholder="Search Items: " style={{ flexShrink: 1, width: '100%', height: '100%', fontFamily: 'Poppins-Regular', color: '#000', fontSize: 14 }} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 12, flexDirection: 'row', height: 74, width: deviceWidth - 24 }}>
                    <View style={{ justifyContent: 'center', width: 24 }}>
                        <MaterialIcons name="arrow-back-ios" size={24} color="#7F7F7F"
                            onPress={backwardArrow}
                        />
                    </View>
                    {/* <ScrollView ref={scrollRef} horizontal scrollEventThrottle={16} 
                        onScroll={e => {
                            setCurrent((e.nativeEvent.contentOffset.x / deviceWidth).toFixed(0))
                        }}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8 }}>
                            {trendProducts.map((item, index) => (
                                <View key={index} style={{ backgroundColor: '#d5d5d5', height: '100%', width: 90, borderRadius: 5 }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', rowGap: -3, backgroundColor: '#fff', width: '100%', height: 31, position: 'absolute', bottom: 0, zIndex: 1, borderRadius: 5 }}>
                                        <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#425466' }}>{item.name}</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 6, color: '#7F7F7F' }}>{item.desc}</Text>
                                    </View>
                                    <Image source={item.image} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                                </View>
                            ))}
                        </View>
                    </ScrollView> */}
                    <Animated.FlatList
                        ref={scrollRef}
                        horizontal
                        keyExtractor={item => item.id.toString()}
                        initialScrollIndex={scrollIndex}
                        data={trendProducts}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: '#d5d5d5', height: '100%', width: 90, borderRadius: 5, marginRight: 8 }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', rowGap: -3, backgroundColor: '#fff', width: '100%', height: 31, position: 'absolute', bottom: 0, zIndex: 1, borderRadius: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 10, color: '#425466' }}>{item.name}</Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 6, color: '#7F7F7F' }}>{item.desc}</Text>
                                </View>
                                <Image source={item.image} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 5 }} />
                            </View>
                        )}
                    />


                    <View style={{ width: 28, alignItems: 'flex-end', justifyContent: 'center' }}>
                        <MaterialIcons name="arrow-forward-ios" size={24} color="#7F7F7F"
                            onPress={forwardArrow}
                        />
                    </View>
                </View>
            </ImageBackground>
            {/* header ends here... */}
            
            {/* filter button categories starts here... */}
            <View style={{ flexDirection: 'row', width: deviceWidth, backgroundColor: '#f1f1f1', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                <ScrollView
                    horizontal
    
                    scrollEventThrottle={16}
                >
                    {categories.map((category, index) => (
                        <View key={category.id} style={{ paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center' }}>
                            <Pressable onPress={() => alert(123)}>
                                <Text style={{ fontFamily: currentIndex == index ? 'Poppins-Medium' : 'Poppins-Regular', fontSize: currentIndex == index ? 14 : 13, color: currentIndex == index ? '#000' : '#7F7F7F' }}>{category.name}</Text>
                            </Pressable>
                        </View>
                    ))}
                </ScrollView>
                {/* <Animated.FlatList
                    data={categories}   
                    horizontal
                    initialScrollIndex={categoriesIndex}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <Pressable style={{ marginHorizontal: 15 }}>
                            <Text style={{ fontFamily: currentIndex == index ? 'Poppins-Medium' : 'Poppins-Regular', fontSize: currentIndex == index ? 14 : 13, color: currentIndex == index ? '#000' : '#7F7F7F' }}>{item.name}</Text>
                        </Pressable>
                    )}
                /> */}
            </View>
            {/* filter button categories ends here... */}

            {/* products starts here... */}
            <View style={{ flex: 1, marginBottom: 45, backgroundColor: '#f1f1f1' }}>
                <ScrollView
                    stickyHeaderIndices={[0]}

                    horizontal={true}
                    pagingEnabled
                    snapToAlignment="center"
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={scrollX => {
                        setCurrentIndex((scrollX.nativeEvent.contentOffset.x / deviceWidth).toFixed(0))
                    }}
                >

                    {/* All product starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={50} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={products} animation={animation} />

                        )}
                    {/* All product ends here... */}

                    {/* Processor starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={processors} animation={animation} />

                        )}
                    {/* Processor ends here... */}

                    {/* Motherboard starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={motherboards} animation={animation} />

                        )}
                    {/* Motherboard ends here... */}

                    {/* Graphics Card starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={graphicCards} animation={animation} />

                        )}
                    {/* Motherboard ends here... */}

                    {/* Laptops starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={laptops} animation={animation} />

                        )}
                    {/* Laptops ends here... */}

                    {/* Monitors starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={monitors} animation={animation} />

                        )}
                    {/* Monitors ends here... */}

                    {/* CPU Fans / AIO Cooler starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={coolers} animation={animation} />

                        )}
                    {/* CPU Fans / AIO Cooler ends here... */}

                    {/* Storage Devices starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={storageDevices} animation={animation} />
                        )}
                    {/* Storage Devices ends here... */}

                    {/* Memory Modules starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={processors} animation={animation} />

                        )}
                    {/* Memory Modules ends here... */}

                    {/* Power Supplies starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={powerSupplies} animation={animation} />

                        )}
                    {/* Power Supplies ends here... */}

                    {/* Cases starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={cases} animation={animation} />

                        )}
                    {/* Cases ends here... */}

                    {/* Pc Set Package starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={fullSets} animation={animation} />

                        )}
                    {/* Pc Set Package ends here... */}

                    {/* Headphones starts here... */}
                    {status ?
                        (

                            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, gap: 15, justifyContent: 'center', alignItems: 'center', paddingLeft: 14 }}>
                                <ActivityIndicator size={30} />
                            </View>

                        ) :
                        (
                            <ItemWrapper category={headphones} animation={animation} />

                        )}
                    {/* Headphones ends here... */}

                </ScrollView>
            </View>
            {/* products ends here... */}
            <StatusBar style={statusStyle} backgroundColor="#222222" hidden={shopLogoBackground} />
        </View >
    )
}

export default DashboardScreen