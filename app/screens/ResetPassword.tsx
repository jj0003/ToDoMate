import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import {  sendPasswordResetEmail } from 'firebase/auth';
import colors from '../../assets/colors';


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
        <ImageBackground source={require('../../assets/ToDoMate-ResetPassword_Background.jpg')}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.topContainer}>
                {!emailSent ? (
                    <>
                        <Text style={styles.textHeading}>Having Trouble??</Text>
                        <Text style={styles.text}>Please enter your email to reset your password.</Text>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email}/>
                        {loading ? <ActivityIndicator size='large' color='blue'/> : 
                        (
                            <>
                            {
                                email === '' ? (
                                    <TouchableOpacity style={styles.buttonResetPasswordDisabled} onPress={resetPassword}>
                                        <Text style={styles.resetPasswordText}>Reset Your Password ᴬᴸᴾᴴᴬ</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.buttonResetPassword} onPress={resetPassword}>
                                        <Text style={styles.resetPasswordText}>Reset Your Password ᴬᴸᴾᴴᴬ</Text>
                                    </TouchableOpacity>
                                )
                                
                            }
                            </>
                        )}
                        <Text>
                            Remembered your password? <Text style={styles.textHighlighted} onPress={() => navigation.navigate('Login')}>Login</Text>
                        </Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.textHeading}>Check Your Inbox!</Text>
                        <Text style={{color: 'green'}}>Email sent successfully. Please check your inbox.</Text>
                        <Text>
                            Didn't recieve an email? <Text style={styles.textHighlighted} onPress={() => setEmailSent(false)}>Try again!</Text>
                        </Text>
                    </>
                )}
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
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
    topContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        gap: 20,
        padding: 20,
    },
    containerAvoid: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.background,
    },
    buttonResetPassword: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    buttonResetPasswordDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.disabled,
    },
    text: {
        color: colors.text,
        width: '100%',
        textAlign: 'left',
    },
    resetPasswordText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    textHighlighted: {
        color: colors.primary,
        fontWeight: 'bold',
    },   
    textHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
    },
})