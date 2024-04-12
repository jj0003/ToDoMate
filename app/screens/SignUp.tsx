import { View, Text, Image, StyleSheet, TextInput, Pressable, ActivityIndicator, KeyboardAvoidingView,TouchableOpacity, ScrollView, SafeAreaView  } from 'react-native'
import React, {  useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';



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
            const imageName = `profilePictures/${user.uid}/${new Date().toISOString()}`;
            const response = await fetch(image);
            const blob = await response.blob();
            const ref = storage().ref(imageName);
            const snapshot = await ref.put(blob);
            imageUrl = await snapshot.ref.getDownloadURL();
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
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
        <View>
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.textHeading}>Let's get you goin', 
                {
                    name ? (
                        <Text> {name}!</Text>
                    ) : (
                        <Text> Mate!</Text>
                    )
                }
                
                </Text>
                <Text style={styles.textMessage}>Please fill in your details below. Remember, a unique and strong password is key to keeping your account secure.</Text>
                {
                    image ? (
                        <TouchableOpacity onPress={pickImage} style={styles.imagePressable}>
                            <Image source={{ uri: image }} style={styles.uploadProfileImage}/>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <Text>Upload Profile Picture</Text>
                            <TouchableOpacity onPress={pickImage} style={styles.uploadContainer}>
                                <Ionicons name="cloud-upload-outline" size={60} color="blue" onPress={pickImage} style={styles.uploadImage} />
                            </TouchableOpacity>

                        </> 
                    )
                }
                <TextInput style={styles.input} placeholder="Name*" autoCapitalize='none' onChangeText={( inputName: string) => setName(inputName)} value={name}/>
                <TextInput style={styles.input} placeholder="Username*" autoCapitalize='none' onChangeText={(inputUsername: string) => setUsername(inputUsername)} value={username}/>
                <TextInput style={styles.input} placeholder="Email*" autoCapitalize='none' onChangeText={(inputEmail: string) => setEmail(inputEmail)} value={email}/>
                <TextInput style={styles.input} placeholder="Password*" secureTextEntry={true} onChangeText={(inputPassword: string) => setPassword(inputPassword)} value={password}/>


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
    </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp


const styles = StyleSheet.create({
    container: {
        marginTop: 40,
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
    image: {
        width: 100,
        height: 100,
    },
    uploadContainer: {
        flexDirection: 'column',
        height: 100,
        width: 100,
        padding: 10,
        borderRadius: 9999,
        backgroundColor: 'white',
    },
    uploadImage: {
        flex: 2,
        alignContent: 'center',
        alignSelf: 'center',
    },
    uploadImageText: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
    },
    uploadProfileImage: {
        width: 100,
        height: 100,
        borderRadius: 9999,        
    },
    imagePressable: {
        width: 100,
        height: 100,
        borderRadius: 9999,
        alignSelf: 'flex-start',
    }
})