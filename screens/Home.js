import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.bloco}>
      <Text style={styles.tx}>Meu Diário</Text>
      <Text style={styles.txt}>Data: 11/03/2024</Text>
      <Text style={styles.tx}>Palavra: Codar</Text>
      <Text style={styles.txt}>Meus Códigos são horríveis!!</Text>
      <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8e9de7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bloco:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#094eb2',
    padding: 10,
    borderRadius:10,
    height:200,
    width:300
  },
  tx:{
    backgroundColor: '#8e9de7',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    margin:2,
    width: 150,
    borderTopRightRadius: 10,
    borderBottomLeftRadius:10,
  },
  txt:{
    backgroundColor: '#8e9de7',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center',
    margin:2,
    width: 150,
    borderBottomRightRadius: 10,
    borderTopLeftRadius:10,
  }
});
