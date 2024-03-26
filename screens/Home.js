import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';

export default function Home({ navigation }) {
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigation.navigate('Login'); 
      }
    });

    return () => unsubscribe(); 
  }, [auth, navigation]);

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
        <Text style={styles.title}>My Daily</Text>
        <Text style={styles.subtitle}>Data: 25/03/2024</Text>
        <Text style={styles.word}>Frase do dia: Vencer e Vencer!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center'
  },
  content: {
    flex: 0.6,
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
  subtitle: {
    fontSize: 16,
    color: '#3E4E5E',
    marginBottom: 5,
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F15A29',
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
});
