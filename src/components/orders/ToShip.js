import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { deviceWidth, deviceHeight } from "../../utils/Dimensions";
import { AntDesign } from '@expo/vector-icons';
import OrderAdress from "./OrderAdress";
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function ToShip(props) {
    const { scrollIndex } = props
    const items = [1, 2, 3, 4, 5]
    return (
        <View style={{ backgroundColor: '#f1f1f1', width: deviceWidth, height: 72 }}>
            <View style={{ height: '100%', width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ backgroundColor: '#d5d5d5', width: 30, height: 30, borderRadius: 100 / 2, alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialCommunityIcons name="clipboard-text-clock-outline" size={20} color="black" />
                </View>
                <Text style={{ color: '#9B9B9B' }}>No Receive Yet</Text>
            </View>
        </View>
        // <View style={{ height: deviceHeight, backgroundColor: '#f1f1f1', width: deviceWidth, opacity: scrollIndex == 1 ? 1 : 0 }}>
        //     <View style={{ backgroundColor: '#f1f1f1', height: 370, paddingHorizontal: 20, paddingVertical: 14 }}>
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             <View style={{ rowGap: 5 }}>
        //                 {items.map((item, index) => (
        //                     <View key={index} style={{ flexDirection: 'row', columnGap: 8, backgroundColor: '#fff', borderRadius: 10, padding: 8 }}>
        //                         <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        //                             <Image source={require('../../../assets/images/products/items/headphone02.jpg')} style={{ height: 86, width: 86, resizeMode: 'cover' }} />
        //                         </View>
        //                         <View style={{ paddingHorizontal: 8, flexShrink: 1 }}>
        //                             <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
        //                             <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000' }}>COOLERMASTER CH331 GAMING HEADSET | RGB LOGO | 50MM DRIVERS | PU EAR CUSHION | USB CONNECTION</Text>
        //                             <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#7F7F7F' }}>Brand: Logitech</Text>
        //                             <View style={{ flexDirection: 'row' }}>
        //                                 <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 15, color: '#FF2E2E', flex: 1 }}>₱1,050</Text>
        //                                 <View style={{ flexDirection: 'row', columnGap: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5', width: 62 }}>
        //                                     <TouchableOpacity>
        //                                         <AntDesign name="minus" size={15} color="#171717" />
        //                                     </TouchableOpacity>
        //                                     <Text style={{ fontFamily: 'Poppins-Regular', color: '#171717' }}>0</Text>
        //                                     <TouchableOpacity>
        //                                         <AntDesign name="plus" size={15} color="#171717" />
        //                                     </TouchableOpacity>
        //                                 </View>
        //                             </View>
        //                         </View>
        //                     </View>
        //                 ))}
        //             </View>
        //         </ScrollView>
        //     </View>
        //     shipping address starts here...
        //     <View style={{ backgroundColor: 'transparent', alignItems: 'center', flex: 1, paddingTop: 10 }}>
        //         <OrderAdress header='Shipping Address:' body='Block 4, Makaputol Santol, Philippines' />
        //         <OrderAdress header='Payment method:' body='Cash On Delivery' />
        //         <OrderAdress header='Delivery method:' body='J&T, 7 days, Free Shipping' />
        //         <OrderAdress header='Total Amount:' body='₱9,450' />
        //     </View>
        //     shipping address ends here...
        // </View>
    )
}
