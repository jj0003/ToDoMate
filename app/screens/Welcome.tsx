import { View, Text, Image, StyleSheet, Pressable, Linking, ImageBackground, TouchableOpacity } from 'react-native'
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
    
    <ImageBackground source={require('../../assets/OutsideStack-ToDoMate.webp')} style={styles.backgroundImage}>
        <View style={styles.container}>
            
            <View style={styles.topContainer}>
                <Image style={styles.logoImage} source={require('../../assets/ToDo - Mate_Logo.png')} />
                <Text style={styles.textHeading}>ToDoMate</Text>
                <Text style={styles.textSubtitle}>WE ENGINEER PRODUCTIVITY.</Text>
            </View>
            
            <View style={styles.bottomContainer}>

                <Text style={styles.textSubheading}>
                    Please log in or sign up to continue.
                </Text>
                <TouchableOpacity style={styles.buttonLogIn} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textLogIn}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignUp} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.textSignUp}>Sign Up</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
    },
    topContainer: {
        alignItems: 'center',
        gap: 20,
        marginTop: 100,
    },
    bottomContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        alignItems: 'center',
        gap: 20,
        padding: 20,
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
        color: 'black',
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
    textSubtitle: {
        fontSize: 18,
        fontWeight: 'normal',
        letterSpacing: 3.5,
    },
    backgroundImage: {
        flex: 1,
        width: '100%', 
        height: '100%',
    },
})