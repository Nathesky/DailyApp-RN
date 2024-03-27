import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import firebaseConfig from '../../firebaseConfig';

export default function CadDiario({ navigation }) {
  const [titulo, setTitulo] = useState(null);
  const [texto, setTexto] = useState(null);
  const [data, setData] = useState(null);
  const [local, setLocal] = useState(null);

  function addDiario() {
    firebaseConfig.collection('diario').add({
        titulo: titulo,
        texto: texto,
        data: data,
        local: local,
    });
    setTitulo({titulo: ''} );
    setTexto({texto: ''});
    setData({data: ''});
    setLocal({local: ''});
    Alert.alert("Cadastro", "Diário adicionado com sucesso");
    navigation.navigate("Home");
}


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Cadastre suas Entradas</Text>
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
