import React from "react";
import { Animated, View } from "react-native";
import AllProductsComp from "../AllProductsComp";
import { deviceWidth } from "../../../utils/Dimensions";
    
export default function ItemWrapper({category, animation}) {
    return (
        <Animated.ScrollView
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: animation } } }], { useNativeDriver: false })}
            horizontal={false} scrollEventThrottle={16} showsVerticalScrollIndicator={false}

        >
            <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, rowGap: 3, flexDirection: 'row', gap: 15, flexWrap: 'wrap', alignItems: 'center', paddingLeft: 14 }}>
                {category.map((item, index) => <AllProductsComp key={index} item={item} />)}
            </View>

        </Animated.ScrollView>
    )
}