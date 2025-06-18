import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartCheckoutScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [semNumero, setSemNumero] = useState(false);
  const [complemento, setComplemento] = useState('');
  const [referencia, setReferencia] = useState('');

  const selectedAddress = addresses.find(a => a.id === selectedId);

  function handleAddAddress() {
    if (!rua.trim()) {
      return Alert.alert('Erro', 'Rua é obrigatória');
    }
    if (!semNumero && !numero.trim()) {
      return Alert.alert('Erro', 'Número é obrigatório ou marque "Sem número"');
    }
    const newAddr = {
      id: Date.now().toString(),
      rua: rua.trim(),
      numero: semNumero ? 'S/N' : numero.trim(),
      complemento: complemento.trim(),
      referencia: referencia.trim(),
    };
    setAddresses(prev => [...prev, newAddr]);
    setSelectedId(newAddr.id);
    setRua(''); setNumero(''); setSemNumero(false);
    setComplemento(''); setReferencia('');
  }

  function handleContinue() {
    if (!selectedAddress) {
      return Alert.alert('Atenção', 'Selecione ou adicione um endereço antes de continuar');
    }
    navigation.navigate('DeliveryOptions', { address: selectedAddress });
  }

  const renderAddr = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addrButton,
        item.id === selectedId && styles.addrSelected
      ]}
      onPress={() => setSelectedId(item.id)}
    >
      <Text style={[styles.addrText, item.id === selectedId && styles.addrTextSel]}>
        {item.rua}, {item.numero}
      </Text>
      {item.complemento ? <Text style={styles.addrSubText}>Compl.: {item.complemento}</Text> : null}
      {item.referencia ? <Text style={styles.addrSubText}>Ref.: {item.referencia}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Entregar em:</Text>

      {addresses.length > 0 && (
        <FlatList
          data={addresses}
          keyExtractor={i => i.id}
          renderItem={renderAddr}
          style={{ flexGrow: 0 }}
        />
      )}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Rua *"
          value={rua}
          onChangeText={setRua}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Número *"
            value={numero}
            onChangeText={setNumero}
            editable={!semNumero}
          />
          <View style={styles.switchContainer}>
            <Switch value={semNumero} onValueChange={setSemNumero} />
            <Text style={styles.switchLabel}>Sem número</Text>
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Complemento (opcional)"
          value={complemento}
          onChangeText={setComplemento}
        />
        <TextInput
          style={styles.input}
          placeholder="Ponto de referência (opcional)"
          value={referencia}
          onChangeText={setReferencia}
        />

        <TouchableOpacity style={styles.addBtn} onPress={handleAddAddress}>
          <Text style={styles.addBtnText}>Adicionar endereço</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueTxt}>Continuar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#fff', padding:20 },
  header:{ fontFamily:'Poppins-Regular', fontSize:20, marginBottom:12 },

  addrButton:{ padding:12, borderWidth:1, borderColor:'#ccc', borderRadius:8, marginVertical:6 },
  addrSelected:{ backgroundColor:'#e8f5e9', borderColor:'#2E7D32' },
  addrText:{ fontFamily:'Poppins-Regular', fontSize:16 },
  addrTextSel:{ color:'#2E7D32', fontWeight:'bold' },
  addrSubText:{ fontSize:14, color:'#555', marginTop:4 },

  form:{ marginTop:20 },
  input:{ borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:12 },
  row:{ flexDirection:'row', alignItems:'center' },
  switchContainer:{ flexDirection:'row', alignItems:'center', marginLeft:12 },
  switchLabel:{ marginLeft:4, fontSize:14 },

  addBtn:{ backgroundColor:'#2E7D32', padding:12, borderRadius:8, alignItems:'center', marginTop:8 },
  addBtnText:{ color:'white', fontFamily:'Poppins-Regular' },

  continueBtn:{ backgroundColor:'#2E7D32', paddingVertical:14, borderRadius:8, alignItems:'center', marginTop:20 },
  continueTxt:{ color:'white', fontSize:16, fontFamily:'Poppins-Regular' }
});
