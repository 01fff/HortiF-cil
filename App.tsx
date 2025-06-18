import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from './contexts/CartContext';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainTabs from './navigation/MainTabs';
import StoreScreen from './screens/StoreScreen';
import CartCheckoutScreen from './screens/CartCheckoutScreen';
import DeliveryOptionsScreen from './screens/DeliveryOptionsScreen';
import PaymentScreen from './screens/PaymentScreen';
import PixQRCodeScreen from './screens/PixQRCodeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Store" component={StoreScreen} />
            <Stack.Screen name="CartCheckout" component={CartCheckoutScreen} />
            <Stack.Screen name="DeliveryOptions" component={DeliveryOptionsScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="PixQRCode" component={PixQRCodeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
}
