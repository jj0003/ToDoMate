import { View, Text, Image, ScrollView ,StyleSheet, Pressable, TextInput, ActivityIndicator, KeyboardAvoidingView, Linking, ImageBackground, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationProp } from '@react-navigation/native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import colors from '../../assets/colors';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Switch } from 'react-native-gesture-handler';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';


interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Settings = ({navigation}:RouterProps) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [username, setUsername] = useState(''); 
    const [loadingName, setLoadingName] = useState(false);
    const [loadingPassword, setloadingPassword] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const auth = FIREBASE_AUTH;

    useEffect(() => {
        getUserName();
        getUserEmail();
        getName();
    }, []); // Fetch user data on component mount

    const resetPassword = async () => {
        setloadingPassword(true);
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset email sent successfully.");
            alert("Password reset email sent successfully. Please check your email inbox.");
        } catch (error: any) {
            alert("Error, couldn't send the reset link to your email: " + error.message);
        }
        finally {
            setloadingPassword(false);
        }
    }

    const getName = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setName(userDoc.data().name);
                } else {
                    console.log("No user data found!");
                }
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    }

    const editName = async () => {
        setLoadingName(true);
        try{
            const user = auth.currentUser;
            if(user){
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                await updateDoc(userDocRef, {
                    name: name
                });
                alert("Name updated successfully!");
            }
        }
        catch (error) {
            console.error("Failed to update name:", error);
        }
        finally {
            setLoadingName(false);
        }
    }



    const getUserEmail = async () => {
        try{
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setEmail(userDoc.data().useremail);
                } else {
                    console.log("No user data found!");
                }
            }
        }
        catch (error) {
            alert("Failed to fetch user email:" + error.message);
        }
    }

    const editUserEmail = async () => {
        setLoadingEmail(true);
        try{
            const user = auth.currentUser;
            if(user){
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                await updateDoc(userDocRef, {
                    useremail: email
                });
                alert("Email updated successfully!");
            }
        }
        catch (error) {
            console.error("Failed to update email:", error);
        }
        finally {
            setLoadingEmail(false);
        }
    }



    const getUserName = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUsername(userDoc.data().username);
                } else {
                    console.log("No user data found!");
                }
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    };

    const editUserName = async () => {
        setLoadingUser(true);
        try{
            const user = auth.currentUser;
            if(user){
                const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
                await updateDoc(userDocRef, {
                    username: username
                });
                alert("Username updated successfully!");
            }
        }
        catch (error) {
            console.error("Failed to update username:", error);
        }
        finally {
            setLoadingUser(false);
        }
    }


    const signOut = async () => {
        setloadingPassword(true);
        try {
            await FIREBASE_AUTH.signOut();
        } catch (error: any) {
            alert("Error signing out: " + error.message);
        }
        finally {
            setloadingPassword(false);
        }
    }

  return (
    
    <ScrollView>
        <View style={styles.container}>
            <View>
                <Text style={styles.h2}>User Settings</Text>
                <Text style={styles.p}>Change your name here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Name" autoCapitalize='none' onChangeText={(name: string) => setName(name)} value={name} />
                    {loadingName ? <ActivityIndicator style={styles.loadingButton} size='large' color='blue' /> : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.marginBottom10]} onPress={editName}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Text style={styles.p}>Change your username here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Username" autoCapitalize='none' onChangeText={(username: string) => setUsername(username)} value={username} />
                    {loadingUser ? <ActivityIndicator style={styles.loadingButton} size='large' color='blue' /> : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.marginBottom10]} onPress={editUserName}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Text style={styles.p}>Change your email address here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email} />
                    {loadingEmail ? <ActivityIndicator style={styles.loadingButton} size='large' color='blue' /> : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.marginBottom10]} onPress={editUserEmail}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Text style={styles.p}>Reset your password here:</Text>
                <View>
                    {loadingPassword ? <ActivityIndicator size='large' color='blue' /> : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={resetPassword}>
                            <Text style={styles.text}>Reset Your Password</Text>
                        </TouchableOpacity>
                    </>
                    )}
                </View>
            </View>
            <View>
                <Text style={styles.h2}>Privacy Settings</Text>
                <Text style={styles.p}>Change your name here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Name" autoCapitalize='none' onChangeText={(name: string) => setName(name)} value={name} />
                    <Switch style={styles.switch} 
                    trackColor={{false: colors.background, true: colors.primary}} 
                    thumbColor={enabled ? colors.white : colors.white}
                    onValueChange={(value) => setEnabled(value)}
                    value={enabled}
                    />
                </View>
                <Text style={styles.p}>Change your username here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Username" autoCapitalize='none' onChangeText={(username: string) => setUsername(username)} value={username} />
                    {loadingUser ? <ActivityIndicator style={styles.loadingButton} size='large' color='blue' /> : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.marginBottom10]} onPress={editUserName}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Text style={styles.p}>Change your email address here:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={(email: string) => setEmail(email)} value={email} />
                    {loadingEmail ? <ActivityIndicator style={styles.loadingButton} size='large' color='blue' /> : (
                        <>
                            <TouchableOpacity style={[styles.button, styles.marginBottom10]} onPress={editUserEmail}>
                                <Text style={styles.text}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <Text style={styles.p}>Reset your password here:</Text>
                <View>
                    {loadingPassword ? <ActivityIndicator size='large' color='blue' /> : (
                    <>
                        <TouchableOpacity style={styles.button} onPress={resetPassword}>
                            <Text style={styles.text}>Reset Your Password</Text>
                        </TouchableOpacity>
                    </>
                    )}
                </View>
            </View>
            <View>
                <Text>
                    Learn more about ToDoMate <Text style={styles.linkText} onPress={() => Linking.openURL('https://budget-mate.org/todomate.html')}>here</Text>.
                </Text>
            </View>
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
        backgroundColor: colors.white,
    },
    settingsContainer:{
        backgroundColor: colors.white,
        padding: 20,
        marginBottom:20,
        borderRadius: 20,
    },
    input: {
        flex: 2,
        borderWidth: 1,
        width: '100%',
        borderColor: colors.border,
        height: 50,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: colors.background,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        width: '100%',
        borderRadius: 10,
        backgroundColor: colors.primary,
    },
    text: {
        color: colors.white,
        fontWeight: 'bold',
    },
    linkText: {
        color: colors.primary,
        fontWeight: 'bold',
    },   
    h1: {
        fontSize: 30,
        fontWeight: 'bold',

    },
    h2: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    p: {
        fontSize: 16,
        marginBottom: 10,
    },
    marginBottom10: {
        marginBottom: 10,
    },
    marginBottom20: {
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    loadingButton:{
        flex: 1.2,
    },
    switch:{
        flex: 0.5,
    }
})