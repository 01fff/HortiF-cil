import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

export default function WelcomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({ 'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf') })
        .then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#2E7D32', alignItems:'center', justifyContent:'center' },
  logo:      { width:120, height:120, marginBottom:20 },
  title:     { fontFamily:'Poppins-Regular', fontSize:30, color:'white', marginBottom:30 },
  button:    { backgroundColor:'white', paddingVertical:12, paddingHorizontal:40, borderRadius:25 },
  buttonText:{ color:'#2E7D32', fontFamily:'Poppins-Regular', fontSize:18 },
});
