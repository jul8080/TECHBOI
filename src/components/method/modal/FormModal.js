import React, { useState } from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import ModalBody from "./ModalBody";
import { deviceWidth } from "../../../utils/Dimensions";
import { Feather  } from '@expo/vector-icons';
import InputBox from "../../inputbox/InputBox";
import SelectBox from "../../inputbox/SelectBox";
import { useContextApi } from "../../../Helper/Index";
import PopupMessage from "./PopupMessage";
import CountryModal from "./CoutryModal";

export default function FormModal(props) {
    const {
        stateAddress,
        setPopupMessage,
        fname,
        number,
        address,
        city,
        region,
        zcode,
        country,
        setFname,
        setNumber,
        setAddress,
        setCity,
        setRegion,
        setZcode,
        setCountry,
    } = useContextApi()
    const { visibleForm, hideForm } = props
    // const [popupMessage, setPopupMessage] = useState(false)

    const submitForm = () => {
        // if (fname == '' || number == '' || address == '' || city == '' || region == '' || zcode == '' || country == '') {
        //     alert('Please fill-up the form')
        // } else {
        //     setPopupMessage(true)
        // }
        alert('Under maintenace')
    }

    const [fnameFocus, setFnameFocus] = useState(false)
    const [numberFocus, setNumberFocus] = useState(false)
    const [addressFocus, setAddressFocus] = useState(false)
    const [cityFocus, setCityFocus] = useState(false)
    const [regionFocus, setRegionFocus] = useState(false)
    const [zcodeFocus, setZcodeFocus] = useState(false)
    const [countryFocus, setCountryFocus] = useState(false)

    return (
        <ModalBody visible={visibleForm} animationType="fade" onRequestClose={hideForm} transparent={false}>
            <CountryModal />
            <PopupMessage />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                    {/* header starts here... */}
                    <View style={{ height: 70 - 20, width: deviceWidth, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 8, paddingHorizontal: 32 }}>
                        <Feather name="arrow-left-circle" size={24} color="black" onPress={hideForm} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ textTransform: 'capitalize', fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000' }}>{stateAddress.statusForm ? 'Edit Delivery Address' : 'Add Delivery Address'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* header ends here... */}
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{ flex: 1, backgroundColor: 'transparent', width: deviceWidth }}>
                            <View style={{ width: deviceWidth - 43.5, alignSelf: 'center', rowGap: 1, marginTop: 20 }}>
                                <InputBox value={fname} onChangeText={setFname} changeText="Full name" isFocus={fnameFocus} setIsFocus={setFnameFocus} />
                                <InputBox value={number} onChangeText={setNumber} keyboardType="numeric" changeText="Phone Number" isFocus={numberFocus} setIsFocus={setNumberFocus} />
                                <InputBox value={address} onChangeText={setAddress} changeText="Address" isFocus={addressFocus} setIsFocus={setAddressFocus} />
                                <InputBox value={city} onChangeText={setCity} changeText="City" isFocus={cityFocus} setIsFocus={setCityFocus} />
                                <InputBox value={region} onChangeText={setRegion} changeText="State/Province/Region" isFocus={regionFocus} setIsFocus={setRegionFocus} />
                                <InputBox value={zcode} onChangeText={setZcode} keyboardType="numeric" changeText="Zip Code (Postal Code)" isFocus={zcodeFocus} setIsFocus={setZcodeFocus} />
                                <SelectBox value={country} onChangeText={setCountry} changeText="Country" iconType="keyboard-arrow-right" size={16} color="#000" isFocus={countryFocus} setIsFocus={setCountryFocus} />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={submitForm}
                                    style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center', height: 44, width: 256, backgroundColor: '#185F2F', borderRadius: 30, alignSelf: 'center' }}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: '#fff' }}>Confirm Changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </ModalBody>
    )
}