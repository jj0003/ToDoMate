import { View, Text, Image, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView } from 'react-native'
import React, {  useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}


const SignUp = ({navigation}: RouterProps) => {
    const[username, setUsername] = useState('');
    const[name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        setLoading(true);
        try {
            const userCredential  = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            console.log(userCredential);
            await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
                username: username,
                useremail: email,
                name : name,
            });
        } catch (error: any) {
            alert("Error signing up: " + error.message);
            console.log(error);
        }
        finally {
            setLoading(false);
        }   
    }

  return (
    <View>
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/ToDo - Mate_Logo.png')}/>
            <Text style={styles.textHeading}>Welcome.</Text>
            <Text style={styles.textMessage}>Let's get you all set up! Please fill in your details below. Remember, a unique and strong password is key to keeping your account secure.</Text>
            <TextInput style={styles.input} placeholder="Name" autoCapitalize='none' onChangeText={( inputName: string) => setUsername(inputName)} value={name}/>
            <TextInput style={styles.input} placeholder="Username" autoCapitalize='none' onChangeText={(inputUsername: string) => setUsername(inputUsername)} value={username}/>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>
            {loading ? <ActivityIndicator size='large' color='blue'/> : 
            (
                <>
                    <Pressable style={styles.buttonSignIn} onPress={signUp}>
                        <Text style={styles.text}>Sign Up</Text>
                    </Pressable>
                </>
            )
            }
            <Text style={styles.signInText}>
                Already have an account? <Text style={styles.textSignUp} onPress={() => navigation.navigate('Login')}>Login</Text>
            </Text>
        </KeyboardAvoidingView>
    </View>
  )
}

export default SignUp


const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 20,
    },
    containerAvoid: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    logo: {
        alignSelf: 'center',
        width: 150,
        height: 150,
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
    },
    textMessage: {
        color: 'grey',

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
    signInText: {
        textAlign: 'center',
    },
})