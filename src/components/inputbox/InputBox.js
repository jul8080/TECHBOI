import { TextInput, View, KeyboardAvoidingView } from 'react-native';
import { deviceWidth } from '../../utils/Dimensions';

export default function InputBox({ placeholder, value, onChangeText }) {
    return (
        <KeyboardAvoidingView style={{ width: '100%', height: 64, backgroundColor: '#fff', paddingLeft: 20, borderRadius: 5 }}>
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={{ height: '100%' }} />
        </KeyboardAvoidingView>
    )
}