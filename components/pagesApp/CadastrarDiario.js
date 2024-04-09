import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; 

export default function CadDiario({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const firestore = getFirestore();

  async function addDiario() {
    try {
      const docRef = await addDoc(collection(firestore, 'diario'), {
        titulo: titulo,
        texto: texto,
        data: data,
        local: local,
      });
      setTitulo('');
      setTexto('');
      setData('');
      setLocal('');
      Alert.alert("Cadastro", "Diário adicionado com sucesso");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao adicionar diário:", error.message);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o diário. Por favor, tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>O que aconteceu hoje?</Text>
      </View>
      <TextInput
        autoCapitalize="sentences"
        style={styles.input}
        placeholder="Título"
        onChangeText={setTitulo}
        value={titulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Texto"
        onChangeText={setTexto}
        value={texto}
        multiline={true}
        numberOfLines={4}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        onChangeText={setData}
        value={data}
      />
      <TextInput
        style={styles.input}
        placeholder="Local"
        onChangeText={setLocal}
        value={local}
      />
      <TouchableOpacity
        style={styles.btnEnviar}
        onPress={() => addDiario()}>
        <Text style={styles.btnTextEnviar}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3E4E5E',
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  btnEnviar: {
    backgroundColor: '#F15A29',
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextEnviar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
