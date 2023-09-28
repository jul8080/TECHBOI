import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { deviceWidth, deviceHeight } from '../utils/Dimensions'
import Shoplogo from "../utils/ShopLogo";
import LinearGText from "../components/gradientText/LinearGText";

export default function SignInScreen({navigation}) {
    const StatusBarStyle = ['auto', 'inverted', 'light', 'dark']
    const statusStyle = React.useState(StatusBarStyle[0])[0]
    const shopLogoBackground = React.useState(false)[0]
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* shop logo starts here... */}
                <View style={{ marginTop: 116, alignItems: 'center', backgroundColor: 'white' }}>
                    <Image source={require('../../assets/images/logo/techboilogo.png')} style={{ resizeMode: 'cover' }} />
                    <View style={{ position: 'absolute', top: 95, backgroundColor: 'red', height: 0, width: deviceWidth, alignItems: 'center', justifyContent: 'center' }}>
                        <LinearGText
                            text='COMPUTER HARDWARE AND ACCESSORIES'
                            fontSize={14}
                            startValueX={-1}
                            startValueY={-1}
                            endValueX={5}
                            endValueY={-10}
                            firstColor='#185F2F'
                            secondColor='#022E10'
                        />
                    </View>
                </View>
                {/* shop logo ends here... */}

                {/* form input starts here... */}
                    <View style={{ alignItems: 'center', justifyContent: 'center', rowGap: 12, marginTop: 87 }} >
                        <View style={{ flexDirection: 'row', width: deviceWidth - 30, height: 50, borderWidth: 1, borderColor: '#BABABA', borderRadius: 10, alignItems: 'center' }}>
                            <MaterialCommunityIcons name="email-outline" size={20} color="#BABABA" style={{ paddingLeft: 15, paddingEnd: 5 }} />
                            <TextInput placeholder="Email" style={{ flexShrink: 1, width: '100%', height: '100%', fontFamily: 'Poppins-Regular' }} />
                        </View>
                        <View style={{ flexDirection: 'row', width: deviceWidth - 30, height: 50, borderWidth: 1, borderColor: '#BABABA', borderRadius: 10, alignItems: 'center' }}>
                            <Feather name="lock" size={20} color="#BABABA" style={{ paddingLeft: 15, paddingEnd: 5 }} />
                            <TextInput secureTextEntry={true} placeholder="Password" style={{ flexShrink: 1, width: '100%', height: '100%', fontFamily: 'Poppins-Regular' }} />
                        </View>
                    </View>
                {/* form input ends here... */}

                {/* forgot Password content starts here... */}
                <View style={{ alignItems: 'flex-end', marginTop: 7, width: deviceWidth - 30 }}>
                    <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 12, color: '#000000', textDecorationLine: 'underline' }}>Forgot Password?</Text>
                </View>
                {/* forgot Password content ends here... */}

                {/* form button starts here ...  */}
                <View style={{ alignItems: 'center', marginTop: 27 }} >
                    <Pressable
                        style={{ width: deviceWidth - 30, height: 50, backgroundColor: '#000', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => navigation.navigate('TabScreen')}
                    >
                        <Text style={{ color: '#ffffff', fontFamily: 'Poppins-SemiBold', fontSize: 15 }}>Sign In</Text>
                    </Pressable>
                </View>
                {/* form button ends here ...  */}

                {/* form content starts here... */}
                <View style={{ flexDirection: 'row', marginTop: 24, alignItems: 'center', justifyContent: 'center', columnGap: 3 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#000000' }}>Didn’t have any account?</Text>
                    <Pressable onPress={() => navigation.push('SignUp')}><Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#0ACF83' }}>Sign Up here</Text></Pressable>
                </View>
                {/* form content ends here... */}

                {/* signin with CONTENT starts here... */}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 56, marginBottom: 15 }}>
                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 12 }}>Sign in with</Text>
                </View>
                {/* signin with CONTENT ends here... */}

                {/* social images starts here... */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 15 }}>
                    <Image source={require('../../assets/images/socialImage/apple.png')} resizeMode="cover" />
                    <Image source={require('../../assets/images/socialImage/facebook.png')} resizeMode="cover" />
                    <Image source={require('../../assets/images/socialImage/google.png')} resizeMode="cover" />
                </View>
                {/* social images ends here... */}
                <StatusBar style={statusStyle} backgroundColor="#ffffff" hidden={shopLogoBackground} />
            </View>
            {shopLogoBackground ? <Shoplogo /> : null}
        </>
    )
}