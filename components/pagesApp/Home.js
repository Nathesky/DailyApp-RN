import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import firebaseConfig from '../../firebaseConfig';
import { FlatList } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const [diario, setDiario] = useState([]);

  useEffect(() => {
    const unsubscribe = firebaseConfig.collection("diario").onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setDiario(list);
    });

    return () => unsubscribe();
  }, []);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigation]);

  const deleteDiario = async (id) => {
    try {
      await firebaseConfig.collection("diario").doc(id).delete();
      Alert.alert("O diário foi deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar o diário:", error);
    }
  };

  const fazerLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={fazerLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Lista de Dias</Text>
        <FlatList
          data={diario}
          renderItem={({ item }) => (
            <View style={styles.diarioItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AlterarDiario", {
                    id: item.id,
                    titulo: item.titulo,
                    texto: item.texto,
                    local: item.local,
                    data: item.data
                  })
                }
              >
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Título: <Text style={styles.itemText}>{item.titulo}</Text></Text>
                  <Text style={styles.itemTitle}>Texto: <Text style={styles.itemText}>{item.texto}</Text></Text>
                  <Text style={styles.itemTitle}>Local: <Text style={styles.itemText}>{item.local}</Text></Text>
                  <Text style={styles.itemTitle}>Data: <Text style={styles.itemText}>{item.data}</Text></Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDiario(item.id)} style={styles.deleteButton}>
                <MaterialCommunityIcons name="delete-empty" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Cadastrar Diario")}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={70} color="green" />
        </TouchableOpacity>
        <Text style={styles.word}>Frase do dia: Vencer e Vencer!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3E4E5E',
  },
  diarioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3E4E5E',
  },
  itemText: {
    color: '#000',
  },
  deleteButton: {
    marginLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 10,
    zIndex: 1,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F15A29',
    marginTop: 20,
  },
});