import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Animated, View } from 'react-native';
import LinearGText from '../components/gradientText/LinearGText';

export default function Shoplogo() {
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = React.useState(StatusBarStyle[0])[0]
    const logoOpacity = React.useState(new Animated.Value(0))[0]
    const zIndex = React.useState(new Animated.Value(1))[0]

    React.useEffect(() => {
        setTimeout(() => {
            const animatedOpacity = Animated.timing(logoOpacity, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start()
            const animatedZindIndex = Animated.timing(zIndex, {
                toValue: -1,
                duration: 1000,
                useNativeDriver: true
            }).start()
            return { animatedOpacity, animatedZindIndex }
        }, 3500)
    }, [logoOpacity, statusStyle, zIndex])

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: '#ffffff', zIndex: zIndex, alignItems: 'center', justifyContent: 'center', opacity: logoOpacity }]}>
            <Image source={require('../../assets/images/logo/techboilogo.png')} style={{ resizeMode: 'cover' }} />
            <View style={{ marginTop: -55, alignItems: 'center', justifyContent: 'center' }}>
                <LinearGText
                    text='COMPUTER HARDWARE AND ACCESSORIES'
                    fontSize={13}
                    startValueX={1}
                    startValueY={2}
                    endValueX={1}
                    endValueY={-2}
                    firstColor='#022E10'
                    secondColor='#185F2F'
                />
            </View>
            <StatusBar style={statusStyle} backgroundColor="#ffffff" hidden={false} />
        </Animated.View>
    )
}