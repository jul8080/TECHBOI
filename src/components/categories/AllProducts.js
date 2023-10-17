import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, Pressable, Image, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { deviceWidth } from '../../utils/Dimensions';
import { getImage } from '../../utils/ProductImage';
import { useNavigation } from '@react-navigation/native';
import { useStatusBar } from '../../Helper/Index';

function AllProducts(props) {
    const navigation = useNavigation()
    const { products, status } = props
    const { onViewCallBack,  viewConfigRef } = useStatusBar()
    const numColumns = 2
    const SeletedItemFuntion = (item) => {
        navigation.navigate('SelectedItems', item)
    }
    return (
        <View style={{ width: deviceWidth, backgroundColor: '#f1f1f1' }}>
            {status ? (
                <View style={{ flex: 1, paddingTop: 50 }}>
                    <ActivityIndicator />
                </View>
            ) : (
                <View style={{ alignItems: 'center', paddingBottom: 45 }}>
                    <FlatList
                        onViewableItemsChanged={onViewCallBack}
                        viewabilityConfig={viewConfigRef}
                        removeClippedSubviews={true}
                        data={products}
                        numColumns={numColumns}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => SeletedItemFuntion(item)}
                                 style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: '#fff', width: deviceWidth / numColumns - 20, height: 333, borderRadius: 15, margin: 10, marginTop: 0 }}>
                                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                                    <Image source={getImage(item.image)} style={{ flex: 1, width: null, height: null, resizeMode: 'cover', borderRadius: 15 }} />
                                </View>
                                <View style={{ backgroundColor: 'transparent', height: 120, paddingVertical: 5 }}>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 13, color: '#000' }}>EDIFIER W800BT PLUS BLUETOOTH STEREO HEA...</Text>
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 20, color: '#FF2E2E' }}>₱1,650</Text>
                                    <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Entypo name="star" size={10} color="#FBBB00" />
                                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>4.8</Text>
                                        </View>
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#7F7F7F' }}>1,150 Sold out</Text>
                                    </View>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            )
            }

        </View >
    )
}
export default memo(AllProducts)