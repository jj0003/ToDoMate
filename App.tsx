import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import List from './app/screens/List';
import Login from './app/screens/Login'; 
import Details from './app/screens/Details';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Welcome from './app/screens/Welcome';
import SignUp from './app/screens/SignUp';
import ResetPassword from './app/screens/ResetPassword';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

const auth = getAuth();

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
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen name="Settings" component={Details} />
    </InsideStack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('User state change detected from the Listener:', currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
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



