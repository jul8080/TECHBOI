import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import ModalBody from "./ModalBody";
import { deviceWidth } from "../../../utils/Dimensions";
import { useContextApi, useStatusBar } from "../../../Helper/Index";
import { Feather, Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Checkbox from 'expo-checkbox';
import FormModal from "./FormModal";
import { ACTIONS } from "../../../Helper/reducer/actions/CartActions";

export default function DeliveryAddress(props) {
    const {
        dispatchAddress,
        setEditData,
        stateAddress,
        setFname,
        setNumber,
        setAddress,
        setCity,
        setRegion,
        setZcode,
        setCountry,
    } = useContextApi()
    const { visible, hideModal } = props
    const { statusStyle, shopLogoBackground } = useStatusBar
    const [visibleForm, setVisibleForm] = useState(false)
    const showForm = () => setVisibleForm(true)
    const hideForm = () => {
        setFname('')
        setNumber('')
        setAddress('')
        setCity('')
        setRegion('')
        setZcode('')
        setCountry('')
        setVisibleForm(false)
        stateAddress.statusForm = false
    }


    const editForm = (person) => {
        setEditData(person.id)
        setFname(person.name)
        setNumber(person.number)
        setAddress(person.address)
        setCity(person.city)
        setRegion(person.region)
        setZcode(person.zcode)
        setCountry(person.country)
        setVisibleForm(true)
        stateAddress.statusForm = true
    }

    return (

        <ModalBody visible={visible} animationType="slide" onRequestClose={hideModal} transparent={false}>

            {/* form modal starts here... */}
            <FormModal visibleForm={visibleForm} hideForm={hideForm} />
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
                    <FlatList
                        data={stateAddress.address}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item: person, index }) => (
                            <View style={{ width: deviceWidth - 54, backgroundColor: '#fff', alignSelf: 'center', paddingHorizontal: 28, paddingVertical: 15, borderRadius: 8, margin: 5 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                        {/* <Ionicons name="person-circle-outline" size={24} color="black" /> */}
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000' }}>{person.name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => editForm(person)}>
                                        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#DB3022' }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ rowGap: 8, marginVertical: 8 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                        {/* <FontAwesome name="phone" size={20} color="black" /> */}
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#425466' }}>{person.number}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                        {/* <MaterialIcons name="place" size={20} color="black" /> */}
                                        <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>{person.address}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', columnGap: 10 }}>
                                    <Checkbox
                                        value={person.completed}
                                        onValueChange={() => dispatchAddress({type: ACTIONS.TOGGLE_COMPLETED, payload: index})}
                                        style={{ height: 15, width: 15 }}
                                        color={'#000000'}
                                    />
                                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 14, color: '#222222' }}>Use as the shipping address</Text>
                                </View>
                            </View>
                        )}
                    />

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