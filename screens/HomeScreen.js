import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const lojas = [
  {
    id: '1',
    nome: 'Hortifruti do José',
    logo: require('../assets/images/store-logo.png'),
    rating: 4.7,
    delivery: 'Grátis',
    distancia: 2.3
  },
  {
    id: '2',
    nome: 'Hortifácil Central',
    logo: require('../assets/images/store-logo.png'),
    rating: 3.8,
    delivery: 'Grátis',
    distancia: 4.5
  },
  {
    id: '3',
    nome: 'Verde & Sabor',
    logo: require('../assets/images/store-logo.png'),
    rating: 3.2,
    delivery: 'Paga',
    distancia: 1.2
  },
  {
    id: '4',
    nome: 'Mercado Verde',
    logo: require('../assets/images/store-logo.png'),
    rating: 4.3,
    delivery: 'Grátis',
    distancia: 3.8
  },
];

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = lojas.filter(l =>
    l.nome.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="O que vai pedir hoje?"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Lojas</Text>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Store', { loja: item })}
          >
            <Image source={item.logo} style={styles.logo} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.nome}</Text>
              <View style={styles.ratingRow}>
                <FontAwesome name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.distance}>
                {item.distancia.toFixed(1)} km
              </Text>
              <Text style={styles.delivery}>
                Entrega:{' '}
                <Text style={item.delivery === 'Grátis' ? styles.free : styles.paid}>
                  {item.delivery}
                </Text>
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40
  },
  sectionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginBottom: 12
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 6,
    marginRight: 12
  },
  info: {
    flex: 1
  },
  name: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 4
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555'
  },
  distance: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2
  },
  delivery: {
    fontSize: 14,
    color: '#555'
  },
  free: {
    color: '#2E7D32',
    fontWeight: 'bold'
  },
  paid: {
    color: '#D32F2F',
    fontWeight: 'bold'
  }
});
