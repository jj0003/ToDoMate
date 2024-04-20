// ShareTodoModal.js
import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../../assets/colors';

const ShareTodoModal = ({ modalVisible, setModalVisible, shareUserNames, setShareUsernames, updateSharedTodo, todo }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textHeading}>Share this Todo</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Add users to share with"
                        value={shareUserNames}
                        onChangeText={setShareUsernames}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            updateSharedTodo(todo.id, shareUserNames);
                            setModalVisible(false);
                            setShareUsernames('');
                        }}
                    >
                        <Text style={styles.text}>Share Todo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonBack}
                        onPress={() => {
                            setModalVisible(false);
                            setShareUsernames('');
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

export default ShareTodoModal;
