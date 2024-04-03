import { View, Text, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';


export interface Todo{
    title: string;
    done: boolean;
    id: string;
}

const List = ({ navigation }: any) => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todoRef = collection(FIRESTORE_DB, "todos");

        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: Todo[] = [];
                snapshot.forEach((doc) => {
                    todos.push({ id: doc.id, ...doc.data() } as Todo);
                });
                setTodos(todos);
            }
        });
        return () => subscriber();
    }, []);

    const addTodo = async () => {
        const doc = addDoc(collection(FIRESTORE_DB, 'todos'), {title: todo, done: false}); 
        setTodo('')
    }

    const renderTodo = ({item}: any) => {

        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);


        const toggleDone = async () => {
            updateDoc(ref, {done: !item.done});
        }
        const deleteItem = async () => {
            deleteDoc(ref);
        }
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity style={styles.todo} onPress={toggleDone}>
                    {item.done && <Ionicons name="checkmark-circle-outline" size={24} color="green" />}
                    {!item.done && <Ionicons name="ellipse-outline" size={24} color="grey" />}
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-outline" size={24} color="red" onPress={deleteItem}/>
            </View>
        )
    }
    return (
    <View style={styles.container}>
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder="Add new todo" onChangeText={(text: string) => setTodo(text)} value={todo}/>
            <Pressable style={styles.button} onPress={addTodo} disabled={todo===''}>
                <Text style={styles.text}>Add Todo</Text>
            </Pressable>
        </View>
        <FlatList
            data={todos}
            keyExtractor={(todo: Todo) => todo.id}
            renderItem={renderTodo}
        />
    </View>
  )
}



export default List

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginRight:10,
        borderWidth: 1,
        height: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: 'blue',
        borderWidth: 1,
    },
    text: {
        color: 'blue',
        fontWeight: 'bold',
    },
    todoContainer:{
        flexDirection: 'row',
        backgroundColor: '#fffff',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
    },
    todoText:{
        flex: 1,
        paddingHorizontal: 5,
    },
    todo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },

})