import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useContextApi } from '../../Helper/Index';

export default function SelectBox({ changeText, iconType, size, color, value, onChangeText, setIsFocus, isFocus }) {

    const { setShowCountryModal } = useContextApi()

   
    const showModal = () => {
        setShowCountryModal(true)
    }
    return (
        <TouchableOpacity
            onPress={showModal}
            activeOpacity={0.5}
            style={{ width: '100%', height: 64, backgroundColor: '#fff', paddingLeft: 20, borderRadius: 5, flexDirection: 'row', zIndex: 1 }}>
            <Text style={{ position: 'absolute', top: value !== '' ? 7 : 22, bottom: 0, left: 20, fontSize: value !== '' ? 11 : 14, bottom: 0, fontFamily: 'Poppins-Medium', color: '#9B9B9B' }}>{changeText}</Text>
            {/* <TextInput value={value} onChangeText={onChangeText} onFocus={() => checkOnFocus(true)} onBlur={() => checkOnblur(false)} /> */}
            <View style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
                <Text >{value}</Text>
            </View>
            <MaterialIcons style={{ position: 'absolute', right: 0, top: 23 }} name={iconType} size={size} color={color} />
        </TouchableOpacity>
    )
}