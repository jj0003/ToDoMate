import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import List from './app/screens/List';    
import Login from './app/screens/Login'; 
import Details from './app/screens/Settings';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './firebaseConfig';
import Welcome from './app/screens/Welcome';
import SignUp from './app/screens/SignUp';
import ResetPassword from './app/screens/ResetPassword';
import { SegmentedControl } from './app/components/SegmentedControls';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();


interface RouterProps {
  navigation: NavigationProp<any, any>;
}

function InsideStackScreens({ navigation }: RouterProps) {



  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="ToDo's" component={List} 
      options={{ 
        headerTitle: 'ToDo\'s',
        headerTitleAlign: 'center',
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Ionicons name="settings" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <InsideStack.Screen name="Settings" component={Details} options={{ headerShown: true, headerBackTitle: 'Back' }} />
    </InsideStack.Navigator>
  );
}
function OutsideStackScreens({ navigation }: RouterProps) {
  return (
    <InsideStack.Navigator>
          <InsideStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <InsideStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <InsideStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <InsideStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: true, title: 'Reset Your Password', headerBackTitle: 'Back' }} />
    </InsideStack.Navigator>
  );
}


export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar backgroundColor={"transparent"} translucent={true} barStyle='dark-content'/>
        <Stack.Navigator initialRouteName='Welcome'>
          {user ? (
            <Stack.Screen name="InsideStackScreens" component={InsideStackScreens} options={{headerShown: false}} />
          ) : (
            <Stack.Screen name="OutsideStackScreens" component={OutsideStackScreens} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    
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

