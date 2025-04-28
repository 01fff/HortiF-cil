import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { Feather, MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';

export default function ProfileScreen() {
  const sections = [
    {
      data: [
        { title: 'Notificações', icon: <Feather name="bell" size={20} color="#333" /> },
        { title: 'Dados da conta', icon: <MaterialIcons name="person" size={20} color="#333" /> },
        { title: 'Pagamentos', icon: <Ionicons name="card" size={20} color="#333" /> },
      ]
    },
    {
      data: [
        { title: 'Ajuda', icon: <Feather name="help-circle" size={20} color="#333" /> },
        { title: 'Configurações', icon: <Feather name="settings" size={20} color="#333" /> },
        { title: 'Segurança', icon: <Entypo name="lock" size={20} color="#333" /> },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Cabeçalho com avatar e nome */}
        <View style={styles.header}>
          <Image
            source={require('../assets/images/usuario-logo.png')}
            style={styles.avatar}
          />
          <Text style={styles.username}>Usuário</Text>
        </View>

        {/* Lista de opções */}
        {sections.map((section, si) => (
          <View key={si} style={styles.section}>
            {section.data.map((item, ii) => (
              <TouchableOpacity key={ii} style={styles.item}>
                <View style={styles.itemLeft}>
                  {item.icon}
                  <Text style={styles.itemText}>{item.title}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#888" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { paddingVertical: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ddd'
  },
  username: {
    marginLeft: 12,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#2E7D32'
  },
  section: {
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333'
  }
});
