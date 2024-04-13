import { View, Text, Image, StyleSheet, Pressable, Linking, ImageBackground } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import colors from '../../assets/colors';




interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Welcome = ({navigation}:RouterProps) => {

    const auth = FIREBASE_AUTH;

  return (
    
    <ImageBackground source={require('../../assets/ToDoMate-Welcome_Background.jpg')} style={styles.backgroundImage}>
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <Image style={styles.logoImage} source={require('../../assets/ToDo - Mate_Logo.png')} />
            <Text style={styles.textHeading}>ToDoMate</Text>
            <Text style={styles.textSubheading}>
                Add ToDo's and share them with your friends.
            </Text>
        </View>
        
        <View style={styles.bottomContainer}>
            <Pressable style={styles.buttonLogIn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.textLogIn}>Log In</Text>
            </Pressable>
            <Pressable style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.textSignUp}>Sign Up</Text>
            </Pressable>
            <Text>
                Learn more about ToDoMate <Text style={styles.textSignUp} onPress={() => Linking.openURL('https://budget-mate.org/todomate.html')}>here</Text>.
            </Text>
        </View>
    </View>
</ImageBackground>
        
    )

}
export default Welcome


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    topContainer: {
        alignItems: 'flex-start',
        gap: 20,
        marginTop: 40,
    },
    bottomContainer: {
        width: '100%', // Ensures the bottom content takes the full width
        alignItems: 'center',
        gap: 20,

        marginBottom: 20, // Gives some space at the bottom
    },
    logoImage: {
        width: 100,
        height: 100,
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
    buttonSignUp:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.background,
    },
    textSubheading:{
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: 16,
    },
    textLogIn: {
        color: colors.background,
        fontWeight: 'bold',
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
    backgroundImage: {
        flex: 1,
        width: '100%', // Ensure it covers the whole width of the screen
        height: '100%' // Ensure it covers the whole height of the screen
    },
})