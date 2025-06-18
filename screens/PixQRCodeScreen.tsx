import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function PixQRCodeScreen({ route }) {
  const { amount } = route.params;

  const payload = `pix://pay?amount=${amount.toFixed(2)}&id=${Date.now()}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pague via Pix</Text>
      <Text style={styles.amount}>R$ {amount.toFixed(2)}</Text>
      <View style={styles.qrContainer}>
        <QRCode value={payload} size={250} />
      </View>
      <Text style={styles.instruction}>Escaneie este QR Code no seu app bancário</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', padding:20, backgroundColor:'#fff' },
  title:     { fontSize:24, fontFamily:'Poppins-Regular', marginBottom:8 },
  amount:    { fontSize:20, marginBottom:20 },
  qrContainer:{ padding:20, backgroundColor:'white', borderRadius:12 },
  instruction:{ fontSize:14, color:'#555', marginTop:20, textAlign:'center' },
});
