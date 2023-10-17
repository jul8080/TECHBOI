import { TextInput, View, Text } from 'react-native';

export default function InputBox({
    placeholder,
    value,
    onChangeText,
    keyboardType,
    changeText,
    setIsFocus,
    isFocus }) {

    const checkOnblur = (status) => {
        if (value === '') {
            setIsFocus(status)
        } else {
            setIsFocus(true)
        }
    }
    return (
        <View style={{ width: '100%', height: 64, backgroundColor: '#fff', paddingLeft: 20, borderRadius: 5 }}>
            <Text style={{ position: 'absolute', top: isFocus || value !== '' ? 7 : 22, bottom: 0, left: 20, fontSize: isFocus ? 11 : 14, bottom: 0, fontFamily: 'Poppins-Medium', color: '#9B9B9B' }}>{changeText}</Text>
            <TextInput onFocus={() => setIsFocus(true)} onBlur={() => checkOnblur(false)} placeholder={placeholder} value={value} onChangeText={onChangeText} style={{ height: '100%' }} keyboardType={keyboardType} />
        </View>

    )
}