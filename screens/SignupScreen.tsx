import React, { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Criar conta</Text>
      <TextInput style={styles.input} placeholder="Nome completo" onChangeText={setNome} value={nome}/>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setSenha} value={senha}/>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar para Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#2E7D32', alignItems:'center', justifyContent:'center', padding:20 },
  title:     { fontFamily:'Poppins-Regular', fontSize:30, color:'white', marginBottom:20 },
  input:     { width:'100%', backgroundColor:'white', borderRadius:8, padding:10, marginVertical:5 },
  button:    { marginTop:15, backgroundColor:'white', padding:12, borderRadius:8, width:'100%', alignItems:'center' },
  buttonText:{ fontFamily:'Poppins-Regular', color:'#2E7D32' },
  link:      { color:'white', marginTop:10 }
});
