import { View, Text, Image, ScrollView ,StyleSheet, Pressable, TextInput, ActivityIndicator, KeyboardAvoidingView, Linking } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';



interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({navigation}:RouterProps) => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const resetPassword = async () => {
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully.");
            alert("Password reset email sent successfully.");
        } catch (error: any) {
            alert("Error, couldn't send the reset link to your email: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const signOut = async () => {
        setLoading(true);
        try {
            await FIREBASE_AUTH.signOut();
        } catch (error: any) {
            alert("Error signing out: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }

  return (
    
    
    <ScrollView>
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/ToDo - Mate_Logo.png')} />
            <Text style={styles.textHeading}>ToDoMate</Text>
            <Text>
                Add ToDo's and share them with your friends.
            </Text>
            <Pressable style={styles.buttonSignOut} onPress={signOut}>
                <Text style={styles.text}>Sign Out</Text>
            </Pressable>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email} />
            {loading ? <ActivityIndicator size='large' color='blue' /> : (
                <>
                    <Pressable style={styles.buttonSignOut} onPress={resetPassword}>
                        <Text style={styles.text}>Reset Your Password ᴬᴸᴾᴴᴬ</Text>
                    </Pressable>
                </>
            )}
            <Text>
                Learn more about ToDoMate <Text style={styles.textSignUp} onPress={() => Linking.openURL('https://budget-mate.org/todomate.html')}>here</Text>.
            </Text>
            <Image style={styles.logo} source={require('../../assets/ToDo - Mate_Logo.png')} />
            <Text style={styles.textHeading}>ToDoMate</Text>
            <Text>
                Add ToDo's and share them with your friends.
            </Text>
            <Pressable style={styles.buttonSignOut} onPress={signOut}>
                <Text style={styles.text}>Sign Out</Text>
            </Pressable>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email} />
            {loading ? <ActivityIndicator size='large' color='blue' /> : (
                <>
                    <Pressable style={styles.buttonSignOut} onPress={resetPassword}>
                        <Text style={styles.text}>Reset Your Password ᴬᴸᴾᴴᴬ</Text>
                    </Pressable>
                </>
            )}
            <Text>
                Learn more about ToDoMate <Text style={styles.textSignUp} onPress={() => Linking.openURL('https://budget-mate.org/todomate.html')}>here</Text>.
            </Text>
        </View>
    </ScrollView>
    )

}
export default Settings


const styles = StyleSheet.create({
    container: {
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