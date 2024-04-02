import { View, Text, Button, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
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
        const doc = addDoc(collection(FIRESTORE_DB, "todos"), {title: todo, done: false}); 
        setTodo('')
    }

    const renderTodo = ({item}: any) => {


        const toggleDone = async () => {

        }
        const deleteItem = async () => {

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
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 100,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
    },
    todoText:{
        flex: 1,
    },
    todo:{
        flexDirection: 'row',
        alignItems: 'center',
    },

})