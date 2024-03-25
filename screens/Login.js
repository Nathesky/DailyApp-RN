import { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { ReactNativeAsyncStorage } from '@react-native-async-storage/async-storage';

// importa função "initializeApp" do Firebase.  
import { initializeApp } from "firebase/app";

// Conlfigurações para o uso do Firebase. 
const firebaseConfig = {
  apiKey: "AIzaSyBws2VH9NiRIna43hw4Ev7hS0ME_I2V5zA",
  authDomain: "appdiario-44d2f.firebaseapp.com",
  projectId: "appdiario-44d2f",
  storageBucket: "appdiario-44d2f.appspot.com",
  messagingSenderId: "255065642756",
  appId: "1:255065642756:web:2329340321865d7df5a251"
};

// usado para iniciar o Firebase no meu aplicativo com as configurações definidas em "firebaseConfig".  
const app = initializeApp(firebaseConfig);

// Inicia a função de altenticação do Firebase.
const auth = initializeAuth(app,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function Login({navigation}){

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [user,setUser] = useState('');


    function login(){
        signInWithEmailAndPassword(auth,email,senha).catch(
            function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorCode,errorMessage);
            }
        )
    }

    useEffect(()=>{
        onAuthStateChanged(auth,function(user){
            setUser(user);
            if(user){
             return navigation.navigate('Home');
            }
            else{}
        })
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.bloco}>
            <Text style={styles.texto}>Acesso ao Diário</Text>
            <TextInput  style={styles.textInput} placeholder=" Digite o email"
            onChangeText={(email)=>setEmail(email)}
            value={email}
            />
            <Text style={styles.texto}>Acesso ao Diário</Text>
            <TextInput style={styles.textInput}placeholder=" Digite a Senha"
            onChangeText={(senha)=>setSenha(senha)}
            value={senha}
            />

            <TouchableOpacity style={styles.botao}
            onPress={()=>{login()}}
            >
                <Text>Logar</Text>
            </TouchableOpacity>
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
        backgroundColor: '#094eb2',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
        height:300,
        width:300,
    },
    texto:{
        fontSize:20,
    },
    textInput:{
        backgroundColor: '#8e9de7',
        borderRadius: 10,
        width: 200,
        height:30,
        margin: 10,
    },
    botao:{
        width:100,
        height:30,
        backgroundColor:'#8e9de7',
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 5,
    }
});