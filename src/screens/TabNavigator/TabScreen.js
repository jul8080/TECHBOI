import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native'
// imported icons here...
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import screen here...
import DashboardScreen from "../DashboardScreen";
import CartScreen from "../CartScreen";
import OrderScreen from "../OrderScreen";
import ProfileScreen from "../ProfileScreen";

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        height: 45,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
    }
}

const TabScreen = () => {
    const Tab = createBottomTabNavigator();
    return (
            <Tab.Navigator screenOptions={screenOptions}>

                <Tab.Screen name="Dashboard" component={DashboardScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <AntDesign name="home" size={focused ? 21 : 20} color={focused ? '#F14336' : '#333'} />
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: focused ? '#F14336' : '#333' }}>Home</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen name="Orders" component={OrderScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <Feather name="clipboard" size={focused ? 21 : 20} color={focused ? '#F14336' : '#333'} />
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: focused ? '#F14336' : '#333' }}>Orders</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen name="Cart" component={CartScreen}
                    options={{
                        tabBarBadge: 3,
                        tabBarBadgeStyle: { backgroundColor: '#F14336', color: '#fff' },
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <MaterialCommunityIcons name="cart-outline" size={focused ? 21 : 20} color={focused ? '#F14336' : '#333'} />
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: focused ? '#F14336' : '#333' }}>Cart</Text>
                                </View>
                            )
                        }
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <FontAwesome5 name="user" size={focused ? 21 : 20} color={focused ? '#F14336' : '#333'} />
                                    <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: focused ? '#F14336' : '#333' }}>Profile</Text>
                                </View>
                            )
                        }
                    }}
                />
                {/* <Tab.Screen name="Settings" component={SettingScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, scale: 2 }}>
                                <Ionicons name="md-settings-outline" size={focused ? 21 : 20} color={focused ? '#F14336' : '#333'} />
                                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: focused ? '#F14336' : '#333' }}>Settings</Text>
                            </View>
                        )
                    }
                }}
            /> */}
            </Tab.Navigator>
    )
}

export default TabScreen