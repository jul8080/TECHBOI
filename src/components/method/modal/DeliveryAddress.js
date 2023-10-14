import React, { useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import ModalBody from "./ModalBody";
import { deviceWidth } from "../../../utils/Dimensions";
import { useStatusBar } from "../../../Helper/Index";
import { Feather, Entypo, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import FormModal from "./FormModal";

export default function DeliveryAddress(props) {
    const { visible, hideModal } = props
    const { statusStyle, shopLogoBackground } = useStatusBar
    const [visibleForm, setVisibleForm] = useState(false)
    const showForm = () => setVisibleForm(true)
    const hideForm = () => setVisibleForm(false)
    return (

        <ModalBody visible={visible} animationType="slide" onRequestClose={hideModal} transparent={false}>

            {/* form modal starts here... */}
            <FormModal visibleForm={visibleForm}  hideForm={hideForm} />
            {/* form modal ends here... */}

            <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                {/* header starts here... */}
                <View style={{ height: 70 - 20, width: deviceWidth, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 8, paddingHorizontal: 32 }}>
                    <Feather name="arrow-left-circle" size={24} color="black" onPress={hideModal} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={showForm} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="plus" size={18} color="black" />
                            <Text style={{ textTransform: 'uppercase', fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000' }}>add new</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* header ends here... */}
                <View style={{ width: deviceWidth, backgroundColor: 'transparent', flex: 1, marginTop: 15 }}>
                    {/* list of address starts here... */}
                    <View style={{ width: deviceWidth - 54, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 15, borderRadius: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                <Ionicons name="person-circle-outline" size={24} color="black" />
                                <Text style={{ fontFamily:'Poppins-Medium', fontSize: 14, color: '#000' }}>Jul Punding</Text>
                            </View>
                            <TouchableOpacity><Text style={{ fontFamily:'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Edit</Text></TouchableOpacity>
                        </View>
                        <View style={{ rowGap: 8, marginVertical: 8 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                <FontAwesome name="phone" size={20} color="black" />
                                <Text style={{ fontFamily:'Poppins-Regular', fontSize: 14, color: '#425466' }}>09993093146</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                <MaterialIcons name="place" size={20} color="black" />
                                <Text style={{ fontFamily:'Poppins-Regular', fontSize: 14, color: '#222222' }}>Block 4, Marang, Davao City, Philippines</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', columnGap: 10 }}>
                            <Checkbox 
                                value={true}
                                onValueChange={() => alert('Checkbox')}
                                style={{ height: 15, width: 15 }}
                                color={'#000000'}
                            />
                            <Text style={{ fontFamily:'Poppins-Regular', fontSize: 14, color: '#222222' }}>Use as the shipping address</Text>
                        </View>
                    </View>
                    {/* list of address ends here... */}
                </View>
                <View style={{ height: 104, width: deviceWidth, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#7F7F7F', width: deviceWidth - 30, height: 44, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: '#fff' }}>Confirm Default Delivery Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style={statusStyle} backgroundColor="#f1f1f1" hidden={shopLogoBackground} />
        </ModalBody>

    )
}