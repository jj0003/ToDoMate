import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import colors from '../../assets/colors';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const Login = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailValid, setEmailValid] = useState(true);

    const validateEmail = (inputEmail: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputEmail);
        setEmailValid(isValid);
        setEmail(inputEmail); 
    };

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
        } catch (error : any) {
            alert("Error signing in: " + error.message);
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }
    
  return (

    <ImageBackground source={require('../../assets/ToDoMate-LogIn_Background.jpg')}>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.textHeading}>Welcome back.</Text>            
                <Text style={styles.textSubheading}>
                    Log in to continue
                </Text>
                <TextInput style={styles.textInput} placeholder="Email" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>

                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.textForgotPassword}>Forgot your password?</Text>
                </TouchableOpacity>
                
                { loading ? <ActivityIndicator size='large' color='blue'/> : 
                (
                    <>
                        {
                            email === '' ||  password.length < 5  ? (
                                <TouchableOpacity style={styles.buttonLogInDisabled} disabled={true}>
                                    <Text style={styles.text}>Log In</Text>
                                </TouchableOpacity> 
                            ) : (
                                <TouchableOpacity style={styles.buttonLogIn} onPress={signIn}>
                                    <Text style={styles.text}>Log In</Text>
                                </TouchableOpacity> 
                            )
                            
                        }
                        
                    </>
                )
                }
                <Text>
                    Don't have an account? <Text style={styles.textSignUp} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    </ImageBackground>
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
    topContainer: {
        alignItems: 'center',
        gap: 20,
    },
    mainContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        gap: 20,
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.border,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.background,
    },
    
    buttonLogIn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    buttonLogInDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.disabled,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    textSubheading:{
        color: colors.text,
        width: '100%',
        textAlign: 'left',
    },
    textSignUp: {
        color: colors.primary,
        fontWeight: 'bold',
    },   
    textHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
    },
    textForgotPassword: {
        textAlign: 'right', 
        width: '100%' ,
    },
})