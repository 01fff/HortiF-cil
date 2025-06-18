import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';

const paymentMethods = ['Cartão', 'Pix'];
const cardTypes = ['Débito', 'Crédito', 'Vale-alimentação'];

export default function PaymentScreen({ navigation }) {
  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce((sum, i) => sum + i.preco * i.quantidade, 0);
  const taxaEntrega = cartItems.length > 0 && cartItems[0]?.delivery === 'Grátis' ? 0 : 10;
  const total = subtotal + taxaEntrega;

  const [method, setMethod] = useState('Cartão');
  const [cardType, setCardType] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvc, setCvc] = useState('');
  const [cpf, setCpf] = useState('');

  const handleFinish = () => {
    if (method === 'Cartão') {
      if (!cardType || !cardNumber.trim() || !cardName.trim() || !cvc.trim()) {
        return Alert.alert('Atenção', 'Preencha todos os dados do cartão');
      }
      Alert.alert('Sucesso', 'Compra finalizada!', [
        { text:'OK', onPress: () => { clearCart(); navigation.replace('Main'); } }
      ]);
    } else {
      if (!cpf.trim()) {
        return Alert.alert('Atenção', 'Digite seu CPF para Pix');
      }
      navigation.navigate('PixQRCode', { amount: total });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Forma de pagamento</Text>

      <View style={styles.methods}>
        {paymentMethods.map(m => (
          <TouchableOpacity
            key={m}
            style={[styles.methodBtn, method===m && styles.methodSel]}
            onPress={() => {
              setMethod(m);
              if (m!=='Cartão') {
                setCardType(null); setCardNumber(''); setCardName(''); setCvc('');
              }
              if (m!=='Pix') {
                setCpf('');
              }
            }}
          >
            <Text style={method===m?styles.methodTxtSel:styles.methodTxt}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {method==='Cartão' && (
        <>
          <Text style={styles.subHeader}>Tipo de cartão:</Text>
          <View style={styles.methods}>
            {cardTypes.map(ct => (
              <TouchableOpacity
                key={ct}
                style={[styles.methodBtn, cardType===ct && styles.methodSel]}
                onPress={() => setCardType(ct)}
              >
                <Text style={cardType===ct?styles.methodTxtSel:styles.methodTxt}>{ct}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Número do cartão"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Nome igual ao cartão"
            value={cardName}
            onChangeText={setCardName}
          />
          <TextInput
            style={styles.input}
            placeholder="CVC"
            keyboardType="numeric"
            value={cvc}
            onChangeText={setCvc}
          />
        </>
      )}

      {method==='Pix' && (
        <TextInput
          style={styles.input}
          placeholder="CPF para Pix"
          keyboardType="numeric"
          value={cpf}
          onChangeText={setCpf}
        />
      )}

      <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
        <Text style={styles.finishTxt}>Finalizar compra</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:20 },
  header:{ fontFamily:'Poppins-Regular', fontSize:20, marginBottom:16 },
  subHeader:{ fontFamily:'Poppins-Regular', fontSize:16, marginTop:12, marginBottom:6 },

  methods:{ flexDirection:'row', justifyContent:'space-around', marginBottom:12 },
  methodBtn:{ flex:1, padding:12, borderWidth:1, borderColor:'#ccc', borderRadius:8, marginHorizontal:4, alignItems:'center' },
  methodSel:{ backgroundColor:'#e8f5e9', borderColor:'#2E7D32' },
  methodTxt:{ color:'#333' },
  methodTxtSel:{ color:'#2E7D32', fontWeight:'bold' },

  input:{ borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:12 },
  finishBtn:{ backgroundColor:'#2E7D32', padding:15, borderRadius:8, marginTop:20, alignItems:'center' },
  finishTxt:{ color:'white', fontSize:16, fontFamily:'Poppins-Regular' },
});
