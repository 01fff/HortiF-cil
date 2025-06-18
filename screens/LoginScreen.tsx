import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // para o ícone do Google

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    navigation.replace('Main');
  };

  const handleGoogleSignIn = () => {
    Linking.openURL('https://accounts.google.com/');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#666"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <FontAwesome name="google" size={18} color="#DB4437" />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signUpLink}>
            Não tem conta? <Text style={styles.signUpText}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = '#2E7D32';
const BG_INPUT = '#F1F8F3';

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 28,
    color: PRIMARY,
    textAlign: 'center',
    marginBottom: 32
  },
  input: {
    backgroundColor: BG_INPUT,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
    color: '#333'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 24
  },
  googleText: {
    marginLeft: 8,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#444'
  },
  loginButton: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  signUpLink: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#444'
  },
  signUpText: {
    color: PRIMARY,
    fontWeight: 'bold'
  }
});
