import { View, Text, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_AUTH } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIRESTORE_AUTH;

    const signUp = async () => {
        createUserWithEmailAndPassword(auth, email, password);
        alert('Check your email to verify your account')
    }
    const signIn = async () => {
       const user = signInWithEmailAndPassword(auth, email, password);
    }

  return (
    <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
        <TextInput style={styles.input} placeholder="Password" textContentType='password' onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>

        <Pressable style={styles.button} onPress={signUp}>
            <Text style={styles.text}>Sign Up</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={signIn}>
            <Text style={styles.text}>Sign In</Text>
        </Pressable>
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
    },

    input: {
        borderWidth: 1,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 1,
    },
    text: {
        color: 'blue',
        fontWeight: 'bold',
    },
})