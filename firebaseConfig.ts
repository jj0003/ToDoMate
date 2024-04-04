import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBvYafBIerPlcWWT7jonBE9cY0cLzQ5KNI",
    authDomain: "mytodoapp-37b8a.firebaseapp.com",
    projectId: "mytodoapp-37b8a",
    storageBucket: "mytodoapp-37b8a.appspot.com",
    messagingSenderId: "50132981197",
    appId: "1:50132981197:web:82e6c0fd6597c0184fe084"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_AUTH = getAuth(FIREBASE_APP);