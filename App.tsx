import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Button, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import List from './app/screens/List';
import Login from './app/screens/Login'; 
import Details from './app/screens/Details';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIRESTORE_AUTH } from './firebaseConfig';
import Welcome from './app/screens/Welcome';
import SignUp from './app/screens/SignUp';
import ResetPassword from './app/screens/ResetPassword';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function InsideStackScreen({ navigation }: RouterProps) {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen 
        name="ToDo's" 
        component={List} 
        options={{
          headerTitle: 'ToDo\'s',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('About')}>
              <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen name="About" component={Details} />
    </InsideStack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIRESTORE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        {user ? (
          <>
          <Stack.Screen name="InsideStackScreen" component={InsideStackScreen} options={{headerShown: false}} />
          <Stack.Screen name="Details" component={Details} options={{ headerShown: true, headerBackTitle: 'Back'}} />
          </>
          
        ) : (
          <>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: true, title: 'Reset Your Password', headerBackTitle: 'Back'}} />
          </>

        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: 'blue',
    fontWeight: 'bold',
    padding: 10,
  },

});


