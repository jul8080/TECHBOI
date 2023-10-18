import { memo } from "react";
import { View, Text, Image, Pressable } from "react-native"
import { useContextApi } from "../../Helper/Index";
import { deviceWidth } from "../../utils/Dimensions";
import { AntDesign } from '@expo/vector-icons';
import { getImage } from "../../utils/ProductImage";
import { ACTIONS } from "../../Helper/reducer/actions/CartActions";
function CartItems({ item }) {

    const { dispatch } = useContextApi()

   
    return (
        <View style={{ width: deviceWidth - 20, backgroundColor: '#f1f1f1', flexDirection: 'row', padding: 8, borderRadius: 10, margin: 3 }}>

            <View style={{ height: '100%', width: 86 }}>
                <Image source={getImage(item.image)} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
            </View>
            <View style={{ flex: 1, paddingLeft: 8 }}>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand: LOGITECH</Text>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#000' }}>{item.name}</Text>
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 11, color: '#7F7F7F' }}>Brand Logitech</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', color: '#FF2E2E', fontSize: 15, flex: 1 }}>₱{item.price}</Text>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 12, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', columnGap: 10, height: 23, width: 62 }}>
                        <Pressable onPress={() => dispatch({ type: ACTIONS.DECREASE_QTY, payload: item })}>
                            <AntDesign name="minus" size={15} color="black" />
                        </Pressable>
                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12 }}>{item.quantity}</Text>
                        <Pressable onPress={() => dispatch({ type: ACTIONS.INCREASE_QTY, payload: item.id })}>
                            <AntDesign name="plus" size={15} color="black" />
                        </Pressable>

                    </View>
                </View>
            </View>
        </View>
    )
}




export default memo(CartItems)