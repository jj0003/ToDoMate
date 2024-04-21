// AddTodoModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, arrayUnion, addDoc } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../firebaseConfig';

const AddTodoModal = ({ modalVisible, setModalVisible, todo, setTodo }) => {
  
  const [inputUserName, setInputUserName] = useState(''); // State to store the input username
  const [newTodoID, setNewTodoID] = useState(''); // State to store the new todo
  const user = FIREBASE_AUTH.currentUser;



  const addTodo = async () => {
    if (!todo.trim()) return;

    try {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'todos'), {
            title: todo,
            done: false,
            userID: user?.uid,
            sharedUserID: []
        }); 
        setTodo('');
        return docRef.id; // Return the ID of the new todo
    } catch (error) {
        console.error("Failed to add todo:", error);
    }
}
    // Function to fetch user ID from username
    const fetchUserIdFromUsername = async (username) => {
        const db = getFirestore(); // Get Firestore instance
        const usersCollection = collection(db, 'users'); // Reference to the 'users' collection
        const userQuery = query(usersCollection, where("username", "==", username)); // Query to find the user by username

        try {
            const querySnapshot = await getDocs(userQuery);
            if (querySnapshot.empty) {
                console.log("No user found with the username:", username);
                return null; // No user found
            } else {
                // Assuming username is unique and only one document will be returned
                const userDoc = querySnapshot.docs[0];
                console.log("User ID:", userDoc.id); // Log the user ID
                return userDoc.id; // Return the user ID
            }
        } catch (error) {
            console.error("Error fetching user ID:", error);
            return null; // Return null in case of error
        }
    };

    
    // Handle user search button press
    const handleSearch = async () => {
        const fetchedUserId = await fetchUserIdFromUsername(inputUserName);
        console.log("Fetched user ID:", fetchedUserId)
        return fetchedUserId;
    };

    const addUserIDToTodo = async (todoID) => {
        const userId = await handleSearch();
        console.log("Adding user ID to todo:", userId);
        const db = getFirestore(); // Initialize Firestore, make sure it's properly configured
        const todoRef = doc(db, 'todos', todoID); // Reference to the todo document
    
        try {
            await updateDoc(todoRef, {
                sharedUserID: arrayUnion(userId) // Adds the userId to the sharedUserID array
            });
            console.log("User ID added to todo successfully", userId);
        } catch (error) {
            console.error("Error updating todo with userID:", error);
        }
    };

  return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textHeading}>Add a new Todo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="New todo"
                        value={todo}
                        onChangeText={setTodo}
                    />
                    <Text style={styles.textHeading}>Share this Todo with your friends</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add users to share with"
                        value={inputUserName}
                        onChangeText={setInputUserName}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={async () => {
                          const newTodoID = await addTodo(); // Wait for addTodo to finish and get the new todo ID
                          if (newTodoID != null) { // If a new todo was added
                            await addUserIDToTodo(newTodoID); // Add the user ID to the new todo
                          }
                          setModalVisible(false);
                          setInputUserName('');
                        }}
                    >
                      <Text style={styles.text}>Add Todo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => {
                          setModalVisible(false);
                          setTodo('');
                        }}
                    >
                        <Text style={styles.textBack}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      padding: 20,
    },
    segmentedControl: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    todoConatiner:{
      backgroundColor: colors.white,
      padding: 20,
      marginBottom:20,
      borderRadius: 20,
    },
    form: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      height: 50,
      padding: 10,
      marginBottom: 20,
      borderRadius: 10,
      backgroundColor: colors.background,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    buttonBack: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      height: 50,
      borderRadius: 10,
      backgroundColor: colors.background,
      marginBottom: 10,
  },
    text: {
        color: colors.white,
        fontWeight: 'bold',
    },
    textBack: {
      color: colors.primary,
      fontWeight: 'bold',
  },
  textHeading: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 10,
  },
    todoContainer:{
        flexDirection: 'row',
        backgroundColor: colors.background,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        padding: 10,
        borderRadius: 10,

    },
    todoText:{
        paddingHorizontal: 5,
    },
    createdByText: {
        paddingHorizontal: 5,
        fontSize: 12,
        fontStyle: 'italic'
    },
    todo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fab: {
      position: 'absolute',  // Ensures that it doesn't depend on other components
      right: 20,             // Distance from the right edge of the screen
      bottom: 20,            // Distance from the bottom edge of the screen
      width: 60,             // Width of the FAB
      height: 60,            // Height of the FAB
      backgroundColor: colors.primary,
      borderRadius: 20,      // Ensures the button is perfectly round
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.black,   // Shadow color for iOS
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      zIndex: 10,
      elevation: 7,         // Elevation for Android (creates a drop shadow)
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  modalView: {
      margin: 20,
      width: '80%',
      backgroundColor: colors.white,
      padding: 20,
      borderRadius: 20,
      shadowColor: colors.black,
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 7
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.modal,
    zIndex: 10, // Ensure it's below the modal but above other content
},

})

export default AddTodoModal;
