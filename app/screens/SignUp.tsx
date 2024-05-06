import { View, Text, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView,TouchableOpacity, ImageBackground  } from 'react-native'
import React, {  useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import colors from '../../assets/colors';



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
            let imageUrl = '';
            await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
                name : name,
                username: username,
                useremail: email,
                profilePicture: imageUrl, // Save the URL of the uploaded image
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
        <ImageBackground source={require('../../assets/OutsideStack-ToDoMate.webp')}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <View style={styles.mainContainer}>
                <Text style={styles.textHeading}>Let's get ya goin', 
                    {
                        name ? (
                            <Text> {name}!</Text>
                        ) : (
                            <Text> Mate!</Text>
                        )
                    }
                    </Text>
                    <View style={styles.nameAndUserNameContainer}>
                        <TextInput style={styles.userNameInput} placeholder="Name*" autoCapitalize='none' onChangeText={( inputName: string) => setName(inputName)} value={name}/>
                        <TextInput style={styles.userNameInput} placeholder="Username*" autoCapitalize='none' onChangeText={(inputUsername: string) => setUsername(inputUsername)} value={username}/>
                    
                    </View>
                    <TextInput style={styles.input} placeholder="Email*" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
                    <TextInput style={styles.input} placeholder="Password*" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>


                    {loading ? <ActivityIndicator size='large' color='blue'/> : 
                    (
                        <>
                        {
                            name === '' || username === '' || email === '' ||  password.length < 5  ? (
                                <TouchableOpacity style={styles.buttonSignUpDisabled} disabled={true}>
                                    <Text style={styles.text}>Sign Up</Text>
                                </TouchableOpacity> 
                            ) : (
                                <TouchableOpacity style={styles.buttonSignUp} onPress={signUp}>
                                    <Text style={styles.buttonTextSignUp}>Sign Up</Text>
                                </TouchableOpacity> 
                            )
                            
                        }
                        </>
                    )
                    }
                    <Text style={styles.signInText}>
                        Already have an account? <Text style={styles.textSignUp} onPress={() => navigation.navigate('Login')}>Login</Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>

  )
}

export default SignUp


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
    containerAvoid: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    nameAndUserNameContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
        width: '100%',
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
    userNameInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.border,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.background,
    },
    buttonSignUp: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    buttonSignUpDisabled: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.disabled,
    },
    buttonTextSignUp: {
        color: 'white',
        fontWeight: 'bold',
    },
    text: {
        color: colors.text,
        textAlign: 'left',
    },
    textMessage: {
        color: 'grey',

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
    signInText: {
        textAlign: 'center',
    },
    uploadContainer: {
        height: 50,
        width: 50,
        borderRadius: 9999,
        backgroundColor: colors.background,
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    uploadIcon: {
        borderRadius: 9999, 
        color: colors.primary,
    },
})