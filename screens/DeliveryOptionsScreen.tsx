import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useCart } from '../contexts/CartContext';

const deliveryOptions = [
  {
    id: 'standard',
    label: 'Padrão',
    subtitle: 'Hoje, 40 – 50 min',
    fee: 0
  },
  {
    id: 'fast',
    label: 'Rápida',
    subtitle: 'Hoje, 20 – 30 min',
    fee: 10
  }
];

export default function DeliveryOptionsScreen({ route, navigation }) {
  const { address } = route.params;       // vindo do CartCheckoutScreen
  const { cartItems } = useCart();

  const [selected, setSelected] = useState('standard');

  const subtotal = cartItems.reduce((s, i) => s + i.preco * i.quantidade, 0);
  const chosen = deliveryOptions.find(o => o.id === selected);
  const total = subtotal + chosen.fee;
  const itemCount = cartItems.reduce((s, i) => s + i.quantidade, 0);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Seu Carrinho</Text>
        <View style={{width:24}}/>
      </View>

      {/* Entregar no endereço */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entregar no endereço</Text>
        <View style={styles.addressRow}>
          <Feather name="map-pin" size={20} color="#2E7D32" />
          <Text style={styles.addressText}>
            {address.rua}, {address.numero} {address.complemento}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('CartCheckout')}>
            <Text style={styles.change}>Trocar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Opções de entrega */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opções de entrega</Text>
        {deliveryOptions.map(opt => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.optCard,
              selected === opt.id && styles.optCardSel
            ]}
            onPress={() => setSelected(opt.id)}
          >
            <View>
              <Text style={styles.optLabel}>{opt.label}</Text>
              <Text style={styles.optSub}>{opt.subtitle}</Text>
            </View>
            <View style={styles.right}>
              {opt.fee === 0
                ? <Text style={styles.optFree}>Grátis</Text>
                : <Text style={styles.optFee}>R$ {opt.fee.toFixed(2)}</Text>
              }
              <View style={[
                styles.radio,
                selected === opt.id && styles.radioSel
              ]}/>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Rodapé resumo */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>
            Total com {chosen.fee === 0 ? 'entrega grátis' : `taxa R$ ${chosen.fee.toFixed(2)}`}
          </Text>
          <Text style={styles.footerAmount}>
            R$ {total.toFixed(2)} / {itemCount} {itemCount===1?'item':'itens'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.btnText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex:1, backgroundColor:'#fff' },
  header: {
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'center', padding:16, borderBottomWidth:1, borderColor:'#eee'
  },
  title:{ fontSize:18, fontFamily:'Poppins-Regular', color:'#2E7D32' },

  section:{ padding:16 },
  sectionTitle:{ fontSize:16, fontFamily:'Poppins-Regular', marginBottom:8 },
  addressRow:{
    flexDirection:'row', alignItems:'center', justifyContent:'space-between'
  },
  addressText:{ flex:1, marginLeft:8, fontSize:14 },
  change:{ color:'#2E7D32', fontFamily:'Poppins-Regular' },

  optCard:{
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'center', backgroundColor:'#F1F8F3', borderRadius:8,
    padding:12, marginBottom:8
  },
  optCardSel:{ backgroundColor:'#E8F5E9' },
  optLabel:{ fontFamily:'Poppins-Regular', fontSize:15 },
  optSub:{ fontSize:13, color:'#555' },
  right:{ alignItems:'flex-end' },
  optFree:{ fontSize:14, color:'#2E7D32', fontWeight:'bold' },
  optFee:{ fontSize:14, color:'#333', fontWeight:'bold' },
  radio:{
    width:20, height:20, borderRadius:10,
    borderWidth:1, borderColor:'#2E7D32', marginTop:6
  },
  radioSel:{
    backgroundColor:'#2E7D32'
  },

  footer:{
    flexDirection:'row', justifyContent:'space-between',
    alignItems:'center', padding:16, borderTopWidth:1, borderColor:'#eee'
  },
  footerText:{ fontSize:14, color:'#555' },
  footerAmount:{ fontSize:16, fontFamily:'Poppins-Regular' },

  btn:{
    backgroundColor:'#2E7D32', paddingHorizontal:20,
    paddingVertical:12, borderRadius:8
  },
  btnText:{ color:'#fff', fontSize:16, fontFamily:'Poppins-Regular' }
});
