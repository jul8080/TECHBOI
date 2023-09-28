import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function ImageLoader() {
    return (
        <View style={{ backgroundColor: 'coral', height: '100%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}>
            <Ionicons name="md-image-outline" size={34} color="#d5d5d5" />
        </View>
    )
}