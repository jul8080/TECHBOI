import React, { } from "react";
import { View, Text, Pressable, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { deviceWidth } from "../utils/Dimensions";
import HelpCenter from "../components/navbar/HelpCenter";
import { useContextApi, useStatusBar } from "../Helper/Index";
import { useNavigation } from "@react-navigation/native";
import YouMayAlsoLike from "../components/trackingparcelitems/YouMayAlsoLike";

export default function TransitScreen() {
    const { products, loading, setShowHelpCenter } = useContextApi()
    const { onViewCallBack,  viewConfigRef } = useStatusBar()
    const navigation = useNavigation()

    const transit = [1, 2, 3, 4, 5]
    return (
        <View style={{ flex: 1 }}>
            {/* modal starts here... */}
            <HelpCenter />
            {/* modal ends here... */}
            <SafeAreaView style={{ backgroundColor: '#fff', width: deviceWidth, height: 86, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', columnGap: 13, paddingHorizontal: 23 }}>
                <AntDesign name="arrowleft" size={15} color="black" onPress={() => navigation.goBack()} />
                <View style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', rowGap: -5 }}>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Tracking your Parcel</Text>
                    <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#7F7F7F' }}>3 Items</Text>
                </View>
                <Pressable onPress={() => setShowHelpCenter(true)}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#7F7F7F' }}>Help</Text>
                </Pressable>
            </SafeAreaView>
            {/* Tracking your Parcel starts here... */}
            <View style={{ height: 300, width: deviceWidth, marginTop: 11 }}>
                <ScrollView>
                    <View style={{ width: deviceWidth, paddingHorizontal: 30, paddingVertical: 5, marginBottom: 17 }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#7F7F7F' }}>Standard shipping through J&T Express</Text>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12, color: '#000' }}>0123456789</Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 47, paddingVertical: 20 }}>
                        {transit.map((item, index) => (
                            <View key={index} style={{ width: deviceWidth - 60, alignSelf: 'center' }}>
                                <View key={index} style={{ width: deviceWidth - 30, borderLeftWidth: index < transit.length - 1 ? 1 : 0, borderColor: '#4F4C4C', paddingLeft: 15, margin: 0, height: 80 }}>
                                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', position: 'absolute', top: -11, left: -3 }}>
                                        <View style={{ width: 5, height: 5, backgroundColor: '#7F7F7F', borderRadius: 100 / 2 }} />
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15 }}>({item}) In Transit</Text>
                                    </View>
                                    <View style={{ rowGap: 11, marginTop: 15 }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>Your Package is now in DAVAO-DEL-SUR.</Text>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>Sep 8, 2023 4:30 PM</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            </View>
            {/* Tracking your Parcel ends here... */}

            {/* All items starts here... */}
            <View style={{ flex: 1 }}>
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
                        <View style={{ alignItems: 'center' }}>
                            <FlatList
                                onViewableItemsChanged={onViewCallBack}
                                viewabilityConfig={viewConfigRef}
                                removeClippedSubviews={true}
                                initialNumToRender={4}
                                estimatedItemSize={200}
                                numColumns={2}
                                data={products}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={_renderItem}
                            />
                        </View>
                    )}
            </View>
            {/* All items ends here... */}
        </View>
    )
}
const _renderItem = ({item}) => <YouMayAlsoLike item={item} />