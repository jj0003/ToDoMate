import { View, Text, Image, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView,TouchableOpacity, ScrollView, SafeAreaView, ImageBackground  } from 'react-native'
import React, {  useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
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
    const [image, setImage] = useState(null);


    
    const signUp = async () => {
        setLoading(true);
        try {
            const userCredential  = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            const user = userCredential.user;
            console.log(userCredential);
            let imageUrl = '';
        if (image) {
        }
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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

  return (
        <ImageBackground source={require('../../assets/ToDoMate-SignUp_Background.jpg')}>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>

                <View style={styles.topContainer}>
                    <Text style={styles.textHeading}>Let's get ya goin', 
                    {
                        name ? (
                            <Text> {name}!</Text>
                        ) : (
                            <Text> Mate!</Text>
                        )
                    }
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    {
                        image ? (
                            <TouchableOpacity onPress={pickImage} style={styles.imagePressable}>
                                <Image source={{ uri: image }} style={styles.uploadImage}/>
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
                                    <Ionicons name="cloud-upload-outline" size={40} onPress={pickImage} style={styles.uploadImage} />
                                </TouchableOpacity>
                                <Text>Upload Profile Picture</Text>
                            </> 
                        )
                    }
                    <View style={styles.nameAndUserNameContainer}>
                        <TextInput style={styles.userNameInput} placeholder="Name*" autoCapitalize='none' onChangeText={( inputName: string) => setName(inputName)} value={name}/>
                        <TextInput style={styles.userNameInput} placeholder="Username*" autoCapitalize='none' onChangeText={(inputUsername: string) => setUsername(inputUsername)} value={username}/>
                    
                    </View>
                    <TextInput style={styles.input} placeholder="Email*" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
                    <TextInput style={styles.input} placeholder="Password*" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>


                    {loading ? <ActivityIndicator size='large' color='blue'/> : 
                    (
                        <>
                            <Pressable style={styles.buttonSignUp} onPress={signUp}>
                                <Text style={styles.buttonTextSignUp}>Sign Up</Text>
                            </Pressable>
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
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 20,
        alignItems: 'center',
    },
    topContainer: {
        alignItems: 'center',
        gap: 20,
        marginTop: 100,
    },
    bottomContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        gap: 20,
        padding: 20,
        marginBottom: 100,
    },
    containerAvoid: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    nameAndUserNameContainer: {
        flexDirection: 'row',
        gap: 10,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    userNameInput: {
        flex: 1,
        borderWidth: 1,
        height: 50,
        padding: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'white',
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
    buttonTextSignUp: {
        color: 'white',
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
    },

    textForgotPassword: {
        textAlign: 'right', 
        width: '100%' ,
    },
    signInText: {
        textAlign: 'center',
    },
    uploadContainer: {
        height: 70,
        width: 70,
        borderRadius: 9999,
        backgroundColor: colors.background,
    },
    uploadImage: {
        height: 70,
        width: 70,
        borderRadius: 9999, 
        color: colors.primary,
    },
    imagePressable: {
        width: 70,
        height: 70,
        borderRadius: 9999,
    },
    uploadImageText: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
    },
    uploadProfileImage: {
        height: 70,
        width: 70,
        padding: 10,
        borderRadius: 9999,       
    },

})