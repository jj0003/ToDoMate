import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import colors from '../../assets/colors';
import { SegmentedControl } from '../components/SegmentedControls';
import SwipeableRow from '../components/SwipeableRow';
import AddTodoModal from '../components/modals/AddTodoModal';
import ShareTodoModal from '../components/modals/ShareTodoModal';

export interface Todo{
    title: string;
    done: boolean;
    id: string;
    sharedUserID: [];
}

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const List = ({ navigation }: RouterProps) => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');
    const auth = getAuth();
    const user = auth.currentUser;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalShareVisible, setModalShareVisible] = useState(false);


    const [selectedOption, setSelectedOption] = useState('My ToDo\'s');
    
    useEffect(() => {
        const unsubscribeAuth = getAuth().onAuthStateChanged((user) => {
          // This fetches all TODO's from the DATABASE that are created by the current USER
          if (user && selectedOption === 'My ToDo\'s') {
            const q = query(collection(FIRESTORE_DB, "todos"), where("userID", "==", user.uid));
            const unsubscribe = onSnapshot(q, (snapshot) => {
              // Make a copy of the fetched data before sorting
              let fetchedTodos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Todo[];

            // Sort the copy of todos alphabetically by the title
            const sortedTodos = [...fetchedTodos].sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

            setTodos(sortedTodos);
            });
            return () => unsubscribe(); // Unsubscribe from Firestore when the user logs out
          }
          // This is just an ALPHA Version of this fucntionality, it only fetches the TODO's that are shared with the current USER
          if (user && selectedOption === 'Shared ToDo\'s') {
            const q = query(collection(FIRESTORE_DB, "todos"), where("sharedUserID", "array-contains", user.uid)); // Of type ARRAY, can be shared with multiple USER  atm
            const unsubscribe = onSnapshot(q, (snapshot) => {
              // Make a copy of the fetched data before sorting
              let fetchedTodos = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Todo[];

            // Sort the copy of todos alphabetically by the title
            const sortedTodos = [...fetchedTodos].sort((a, b) => 
                a.title.toLowerCase().localeCompare(b.title.toLowerCase()));

            setTodos(sortedTodos);
            });
            return () => unsubscribe(); // Unsubscribe from Firestore when the user logs out
          }
        });
        return () => unsubscribeAuth(); // Cleanup auth listener when component unmounts
      }, [selectedOption]);
      

    const addTodo = async () => {
        if (!todo.trim()) return;
    
        try {
            await addDoc(collection(FIRESTORE_DB, 'todos'), {
                title: todo,
                done: false,
                userID: user?.uid,
                sharedUserID: []
            }); 
            setTodo('');
        } catch (error) {
            console.error("Failed to add todo:", error);
        }
    }

    const updateSharedTodo = async (todoId, shareUserNames) => {
      if (!shareUserNames.trim()) return;
  
      try {
          const todoRef = doc(FIRESTORE_DB, 'todos', todoId); // Correct reference to the todo document
          await updateDoc(todoRef, { sharedWith: shareUserNames }); // Update sharedWith field
          console.log("Todo updated successfully with shared user names!");
      } catch (error) {
          console.error("Failed to update todo:", error);
      }
  };
    
    const TodoItem = ({ item }) => {
        const [username, setUsername] = useState('');
        const db = getFirestore();
      
        // useEffect to fetch the USERNAME of the USER who created the TODO
        useEffect(() => {
          const fetchUsername = async () => {
            if (item.userID) {
              const userRef = doc(db, `users/${item.userID}`);
              const userSnap = await getDoc(userRef);
      
              if (userSnap.exists()) {
                setUsername(userSnap.data().username);
              } else {
                setUsername('unkown user');
              }
            }
          };

          fetchUsername();
        }, [item.userID]);
      
        // Function to toggle the TODO between done and not done
        const toggleDone = async () => {
          const ref = doc(db, `todos/${item.id}`);
          await updateDoc(ref, { done: !item.done });
        };

        // Function to share the TODO with another USER
         const shareItem = async (item, names) => {
          console.log('Share item:', item);
          const ref = doc(db, `todos/${item.id}`);
          await updateDoc(ref, { shareToUserNames: names });
        };
      
        // Function to delete the TODO
        const deleteItem = async (item) => {
          const ref = doc(db, `todos/${item.id}`);
          await deleteDoc(ref);
        };
      
        return (
          <SwipeableRow onDelete={() => deleteItem(item)} onSwipeableLeftOpen={() => {setModalShareVisible(true); setTodo(item)}}>
              <View style={styles.todoContainer}>
                <TouchableOpacity style={styles.todo} onPress={toggleDone}>
                  {item.done ? <Ionicons name="checkmark-circle-outline" size={24} color="green" /> : <Ionicons name="ellipse-outline" size={24} color="grey" />}
                  <View>
                    <Text style={styles.todoText}>{item.title}</Text>
                    <Text style={styles.createdByText}>Created by {username}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </SwipeableRow>
        );
      };
  const FloatingActionButton = ({ onPress }) => (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Ionicons name="add" size={24} color="white" />
    </TouchableOpacity>
  );


  return (


    <ImageBackground source={require('../../assets/ToDoMate-List_Background.jpg')}>
      <ShareTodoModal modalVisible={modalShareVisible} setModalVisible={setModalShareVisible} todo={todo} setTodo={setTodo}/>
      <AddTodoModal modalVisible={modalVisible} setModalVisible={setModalVisible} todo={todo} setTodo={setTodo} />
        {/* Overlay that appears when modal is visible */}
        {modalVisible && (
        <View style={styles.modalBackground}></View>
        )}
        <FloatingActionButton onPress={() => setModalVisible(true)}/>

          <View style={styles.container}>
        
          <View style={styles.segmentedControl}>
            <SegmentedControl
            options={['My ToDo\'s', 'Shared ToDo\'s']} 
            selectedOption={selectedOption} 
            onOptionPress={setSelectedOption}/>
          </View>
          <FlatList
              style={styles.todoConatiner}
              data={todos}
              keyExtractor={(todo: Todo) => todo.id}
              renderItem={({ item }) => <TodoItem item={item} />}
          />
      </View>
  </ImageBackground>

  )
}

export default List

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