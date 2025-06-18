import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';

export default function CartScreen({ navigation }) {
  const { cartItems, addToCart, removeFromCart, storeDelivery } = useCart();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Image source={require('../assets/images/empty-cart.png')} style={styles.emptyImage}/>
        <Text style={styles.emptyText}>Seu carrinho está vazio</Text>
      </SafeAreaView>
    );
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.preco * i.quantidade, 0);
  const taxaEntrega = storeDelivery === 'Grátis' ? 0 : 10;
  const total = subtotal + taxaEntrega;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={i => i.id}
        contentContainerStyle={{ paddingBottom: 180 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.price}>
                R$ {item.preco.toFixed(2)} x {item.quantidade}
              </Text>
            </View>
            <View style={styles.qtyContainer}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => removeFromCart(item.id)}>
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{item.quantidade}</Text>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => addToCart(item, storeDelivery)}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Taxa entrega:</Text>
            <Text style={styles.summaryValue}>
              {taxaEntrega === 0 ? 'Grátis' : `R$ ${taxaEntrega.toFixed(2)}`}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text>Total a pagar:</Text>
            <Text style={[styles.summaryValue, styles.totalValue]}>
              R$ {total.toFixed(2)}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('CartCheckout')}>
          <Text style={styles.continueText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff'
  },
  emptyImage: { width:120, height:120, marginBottom:20 },
  emptyText: { fontFamily:'Poppins-Regular', fontSize:18, color:'#555' },

  container:{ flex:1, backgroundColor:'#fff' },
  card:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#f9f9f9',
    margin:16,
    borderRadius:8,
    padding:12
  },
  image:{ width:60, height:60, borderRadius:6, marginRight:12 },
  info:{ flex:1 },
  name:{ fontFamily:'Poppins-Regular', fontSize:16, marginBottom:4 },
  price:{ fontSize:14, color:'#555' },
  qtyContainer:{ flexDirection:'row', alignItems:'center' },
  qtyButton:{
    width:32,
    height:32,
    borderRadius:16,
    backgroundColor:'#2E7D32',
    alignItems:'center',
    justifyContent:'center'
  },
  qtyText:{ color:'#fff', fontSize:20, lineHeight:20 },
  qtyValue:{ marginHorizontal:8, fontSize:16 },

  footer:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:'#fff',
    padding:16,
    borderTopWidth:1,
    borderColor:'#eee'
  },
  summary:{ marginBottom:12 },
  summaryRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    fontSize:16,
    marginVertical:2
  },
  summaryValue:{ fontWeight:'bold' },
  totalRow:{ marginTop:8 },
  totalValue:{ color:'#2E7D32', fontSize:18 },

  continueButton:{
    backgroundColor:'#2E7D32',
    paddingVertical:14,
    borderRadius:8,
    alignItems:'center'
  },
  continueText:{ color:'white', fontSize:16, fontFamily:'Poppins-Regular' }
});
