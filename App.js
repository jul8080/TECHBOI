import React from 'react';
// installed dependencies...
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
// import screens...
import SignInScreen from './src/authScreens/SignInScreen';
import SignUpScreen from './src/authScreens/SignUpScreen';
import TabScreen from './src/screens/TabNavigator/TabScreen';
import SelectedItemsScreen from './src/screens/SelectedItemsScreen';
import TransitScreen from './src/screens/TransitScreen';

const Stack = createStackNavigator()
export default function App() {


  const [loaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Helvetica': require('./assets/fonts/Helvetica.ttf'),
    'Helvetica-Bold': require('./assets/fonts/Helvetica-Bold.ttf'),
  })
  if (!loaded) {
    return null
  } 
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
        >
          <Stack.Screen name="SignIn" children={props => <SignInScreen {...props} />} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TabScreen" component={TabScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SelectedItems" component={SelectedItemsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Transit" component={TransitScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer >
    </>
  );
}
// json-server --host 0.0.0.0 ./data/db.json

// git config --global core.autocrlf false
// ...StyleSheet.absoluteFillObject -> perfectly centered the object