import { View, Text, Image, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const ResetPassword = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false); 
    const auth = FIREBASE_AUTH;

    const resetPassword = async () => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully.");
            setEmailSent(true);
        } catch (error: any) {
            alert("Error, couldn't send the reset link to your email: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <View>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        {!emailSent ? (
                <>
                    <Text style={styles.textHeading}>Having Trouble??</Text>
                    <Text>Please enter your email to reset your password.</Text>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email}/>
                    {loading ? <ActivityIndicator size='large' color='blue'/> : 
                    (
                        <Pressable style={styles.buttonSignOut} onPress={resetPassword}>
                            <Text style={styles.text}>Reset Your Password ᴬᴸᴾᴴᴬ</Text>
                        </Pressable>
                    )}
                    <Text>
                        Remembered your password? <Text style={styles.textSignUp} onPress={() => navigation.navigate('Login')}>Login</Text>
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.textHeading}>Check Your Inbox!</Text>
                    <Text style={{color: 'green'}}>Email sent successfully. Please check your inbox.</Text>
                    <Text>
                        Didn't recieve an email? <Text style={styles.textSignUp} onPress={() => setEmailSent(false)}>Try again!</Text>
                    </Text>
                </>
            )}

           
        </KeyboardAvoidingView>
    </View>
  )
}

export default ResetPassword


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
    buttonSignOut: {
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