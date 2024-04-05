import { View, Text, Image, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FIRESTORE_AUTH } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const Login = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIRESTORE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
            alert("Error signing in: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <View>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/ToDo - Mate_Logo.png')}/>
            <Text style={styles.textHeading}>Welcome back.</Text>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>

            <Text style={styles.textForgotPassword} onPress={() => navigation.navigate('ResetPassword')}>Forgot your password?</Text>
            
            {loading ? <ActivityIndicator size='large' color='blue'/> : 
            (
                <>
                    <Pressable style={styles.buttonSignIn} onPress={signIn}>
                        <Text style={styles.text}>Log In</Text>
                    </Pressable>
                </>
            )
            }
            <Text>
                Don't have an account? <Text style={styles.textSignUp} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
            </Text>
        </KeyboardAvoidingView>
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
    },
    containerAvoid: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    logo: {
        width: 100,
        height: 100,
    },
    input: {
        borderWidth: 1,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    buttonSignIn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'blue',
        borderColor: 'white',
        borderWidth: 1,
    },
    buttonSignUp:{
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
        color: 'white',
        fontWeight: 'bold',
    },
    textSignUp: {
        color: 'blue',
        fontWeight: 'bold',
    },   
    textHeading: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    textForgotPassword: {
        textAlign: 'right', 
        width: '100%' ,
    },
})