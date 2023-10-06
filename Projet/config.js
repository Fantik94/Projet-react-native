import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyD8UF5yHTnTga5EXaTqOZ77wIFHzyirfqs",
    authDomain: "projet-react-native-h3m1.firebaseapp.com",
    projectId: "projet-react-native-h3m1",
    storageBucket: "projet-react-native-h3m1.appspot.com",
    messagingSenderId: "93160791658",
    appId: "1:93160791658:web:ba660a6d00bee2ea59f413"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });

export default db;
