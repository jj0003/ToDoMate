import { View, Text, Image, StyleSheet, Pressable, Linking } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';




interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Welcome = ({navigation}:RouterProps) => {

    const auth = FIREBASE_AUTH;

  return (
    
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/ToDo - Mate_Logo.png')}/>
            <Text style={styles.textHeading}>ToDoMate</Text>
            <Text>
                Add ToDo's and share them with your friends.
            </Text>        
            <Pressable style={styles.buttonSignIn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.text}>Log In</Text>
            </Pressable>
            <Pressable style={styles.buttonSignUp} onPress={()=> navigation.navigate('SignUp')}>
                <Text style={styles.textSignUp}>Sign Up</Text>
            </Pressable>
            <Text>
                Learn more about ToDoMate <Text style={styles.textSignUp} onPress={() => Linking.openURL('https://budget-mate.org/todomate.html')}>here</Text>.
            </Text>
        </View>
    )

}
export default Welcome


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        gap: 20,
        padding: 20,
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