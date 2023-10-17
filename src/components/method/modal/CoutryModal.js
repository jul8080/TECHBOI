import React from "react";
import { Text, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import { deviceWidth } from "../../../utils/Dimensions";
import { useContextApi } from "../../../Helper/Index";
import { Pressable } from "react-native";

export default function CountryModal() {
    const { setCountry, showCountryModal, setShowCountryModal } = useContextApi()
    const countries = [
        { id: 1, name: 'Philippines', image: 'https://cdn.britannica.com/73/3473-050-3A33E719/Flag-Philippines.jpg' },
        { id: 2, name: 'Kuwait', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Flag_of_Kuwait.svg/1920px-Flag_of_Kuwait.svg.png' },
        { id: 3, name: 'United State', image: 'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg' },
    ]
    const selectCountry = (country) => {
        setCountry(country.name)
        setShowCountryModal(false)
    }
    return (
        <Modal visible={showCountryModal} onRequestClose={() => setShowCountryModal(false)} transparent={true}>
            <TouchableOpacity activeOpacity={1} onPress={() => setShowCountryModal(false)} style={{ flex: 1, backgroundColor: 'rgba(0,0,0, .2)', alignItems: 'center', justifyContent: 'center' }}>
                <Pressable style={{ width: deviceWidth - 50, backgroundColor: '#fff', height: 500, padding: 20}}>
                    <FlatList
                        data={countries}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item: country }) => (
                            <TouchableOpacity
                                onPress={() => selectCountry(country)}
                                activeOpacity={.8}
                                style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                                <Image source={{ uri: country.image }} style={{ width: 30, height: 30, resizeMode: 'center' }} />
                                <Text style={{ fontFamily: 'Poppins-Medium' }}>{country.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </Pressable>
            </TouchableOpacity>

        </Modal>
    )
}