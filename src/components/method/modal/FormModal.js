import React, { } from "react";
import { View, Text, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import ModalBody from "./ModalBody";
import { deviceWidth } from "../../../utils/Dimensions";
import { Feather } from '@expo/vector-icons';
import InputBox from "../../inputbox/InputBox";

export default function FormModal(props) {
    const { visibleForm, hideForm } = props
    return (
        <ModalBody visible={visibleForm} animationType="fade" onRequestClose={hideForm} transparent={false}>
            <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                {/* header starts here... */}
                <View style={{ height: 70 - 20, width: deviceWidth, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 8, paddingHorizontal: 32 }}>
                    <Feather name="arrow-left-circle" size={24} color="black" onPress={hideForm} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ textTransform: 'capitalize', fontSize: 15, fontFamily: 'Poppins-Medium', color: '#000' }}>Edit Delivery Address</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* header ends here... */}
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ flex: 1, backgroundColor: 'transparent', width: deviceWidth }}>
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ width: deviceWidth - 43.5, alignSelf: 'center', rowGap: 1, marginTop: 20 }}>
                            <InputBox placeholder='Full name' />
                            <InputBox placeholder='Phone Number' />
                            <InputBox placeholder='Address' />  
                            <InputBox placeholder='City' />
                            <InputBox placeholder='State/Province/Region' />
                            <InputBox placeholder='Zip Code (Postal Code)' />
                            <InputBox placeholder='Country' />
                            <Pressable style={{marginTop: 24, alignItems: 'center', justifyContent: 'center', height: 44, width: 256, backgroundColor: '#185F2F', borderRadius: 30, alignSelf: 'center' }}>
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 15, color: '#fff' }}>Confirm Changes</Text>
                            </Pressable>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>

            </View>
        </ModalBody>
    )
}